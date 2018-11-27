<template>
<div>
   <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Demande</h1>
    </div>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Début</label>
            <datetime input-class="form-control" type="datetime" v-on:change="setMinDuration(date)" v-model="dateStart"></datetime>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Fin</label>
            <datetime input-class="form-control" type="datetime" v-bind:min-datetime="min_duration" v-model="dateEnd"></datetime>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Type</label>
            <select class="form-control" v-model="type">
                <option value="" selected disabled hidden>Choisir ici</option>
                <option value="conge-paye">Congé payé</option>
                <option value="recu-tmp-travail">Récuparation de temps de travail</option>
                <option value="annu-horaire">Annulation d'horaire</option>
            </select>
        </div>
        <button type="submit" @click="handleSubmit" class="btn btn-primary">Submit</button>
    </form>

    <div class="allDemande" style="margin-top:20px;">
        <h2>Historique</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Date start</th>
                  <th>Date end</th>
                  <th>Validation</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="demande in allDemande" v-bind:key="demande.id">
                  <td>{{demande.id}}</td>
                  <td>
                        <span v-if="demande.type == 'conge-paye'" class="badge badge-primary">Congé payé</span>
                        <span v-else-if="demande.type == 'recu-tmp-travail'" class="badge badge-secondary">Récup temps travail</span>
                        <span v-else class="badge badge-info">Annulation horraire</span>
                  </td>
                  <td>{{demande.dateStart}}</td>
                  <td>{{demande.dateEnd}}</td>
                  <td>
                        <span v-if="demande.validation == 'validated'" class="badge badge-success">Accepté</span>
                        <span v-else-if="demande.validation == 'refused'" class="badge badge-error">Refusé</span>
                        <span v-else class="badge badge-warning">En attente</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="alert alert-primary text-center" role="alert" v-if="allDemande.length == 0 && !loading">Aucune demande faite</div>
            <div class="alert alert-primary text-center" role="alert" v-if="loading">Contenu en cours de chargement</div>
          </div>
    </div>
</div>

</template>

<script>
import config from "../../../config.js";
import swal from 'sweetalert2'
var moment = require('moment');


export default {
  name: "DemandeComponent",
  data() {
    return {
      min_duration: "",
      max_durarion: "",
      dateStart: "",
      dateEnd: "",
      type: "",
      user: {},
      allDemande: [],
      loading:true
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.launchGetDemande()
  },
  methods: {
    handleSubmit(e) {
      let that = this;
      e.preventDefault();
      
      if(this.type == "", this.dateStart == "", this.dateEnd == ""){
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Début / Fin / Type non défini, veuillez ne pas laisser les inputs vide',
        })
      }else{
        this.$http
          .post(config.urlApi + "/asking", {
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            userId: this.user.id,
            type: this.type,
            email: this.user.email
          })
          .then(response => {
            console.log(response);
          });
      }
    },
    launchGetDemande() {
      setInterval(() => {
        this.$http
          .get(config.urlApi + `/users/${this.user.id}/asking`)
          .then(response => {
              const arrayResult = []
              response.data.demande.forEach((demande) => {
                  var tmpDemande = {}
                  tmpDemande = demande
                  tmpDemande["dateStart"] = moment(demande.dateStart).format("D / MM / YYYY hh:mm:ss a")
                  tmpDemande["dateEnd"] = moment(demande.dateEnd).format("D / MM / YYYY hh:mm:ss a")
                  arrayResult.push(tmpDemande)
              })
              this.loading = false
            this.allDemande = arrayResult
          });
      }, 1000);
    }
  },
  watch: {
    dateStart: function(newVal, oldVal) {
      this.min_duration = newVal;
    }
  }
};
</script>

<style scoped>
</style>



