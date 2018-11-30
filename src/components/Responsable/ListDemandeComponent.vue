<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Liste des demandes</h1>
        </div>
    
      <div class="allDemande" style="margin-top:20px;">
        <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Date start</th>
                  <th>Date end</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="demande in allDemande" v-bind:key="demande.id">
                  <td>{{demande.id}}</td>
                  <td>{{demande.userEmail}}</td>
                  <td>
                        <span v-if="demande.type == 'conge-paye'" class="badge badge-primary">Congé payé</span>
                        <span v-else-if="demande.type == 'recu-tmp-travail'" class="badge badge-secondary">Récup temps travail</span>
                        <span v-else class="badge badge-info">Annulation horraire</span>
                  </td>
                  <td>{{demande.dateStart}}</td>
                  <td>{{demande.dateEnd}}</td>
                  <td>
                        <span v-if="demande.validation == 'validated'" class="badge badge-success">Accepté</span>
                        <span v-else-if="demande.validation == 'refused'" class="badge badge-danger">Refusé</span>
                        <span v-else class="badge badge-warning">En attente</span>
                  </td>
                  <td>
                        <div v-if="demande.validation != 'validated' && demande.validation != 'refused'">
                            <button type="button" @click="updateValidation(demande.id, 'validated')" class="btn btn-sm btn-success">Accepte</button>
                            <button type="button" @click="updateValidation(demande.id, 'refused')" style="margin-left:10px;" class="btn btn-sm btn-danger">Refuse</button>
                        </div>
                        <div v-else>
                            -
                        </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="alert alert-primary text-center"  role="alert" v-if="allDemande.length == 0 && !loading">Aucune demande faite</div>
            <div class="alert alert-primary text-center"  role="alert" v-if="loading">Contenu en cours de chargement</div>
          </div>
      </div>
    </div>
</template>

<script>
import config from "../../../config.js";
var moment = require('moment');
export default {
    data(){
        return {
            allDemande:[],
            loading:true,
            user:""
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem("user"));
        this.getDemande()
    },
    methods:{
        getDemande(){
            setInterval(()=>{
                this.$http
                    .get(config.urlApi + `/users/${this.user.id}/resp/asking`)
                    .then(response => {
                        const arrayResult = []
                        response.data.demandes.forEach((demande) => {
                            var tmpDemande = {}
                            tmpDemande = demande
                            tmpDemande["dateStart"] = moment(demande.dateStart).format("DD / MM / YYYY hh:mm:ss a")
                            tmpDemande["dateEnd"] = moment(demande.dateEnd).format("DD / MM / YYYY hh:mm:ss a")
                            arrayResult.push(tmpDemande)
                        })
                        console.log(arrayResult)
                        this.loading = false
                        this.allDemande = arrayResult
                    });
            },1000)
        },
        updateValidation(ask_id, validation){
            this.$http
                .post(config.urlApi + `/asking/update`, {ask_id : ask_id, validation: validation})
                .then(response => {
                    this.allDemande.forEach((e) => {
                        if(ask_id == e.id){
                            e.validation = validation
                        }
                    })
                });
        }
    }
}
</script>
