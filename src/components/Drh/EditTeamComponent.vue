<template>
    <div>
         <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Team edit | {{team.name}}</h1>
    </div>
    <div class="alert alert-warning" role="alert">
  L'édition et l'ajout d'utilisateur dans une équipe est en cours de développement
</div>
    <form action="">
            <div class="form-group">
                <label for="">Nom</label>
                <input type="text" disabled v-model="team.name" class="form-control" name="nom">
            </div>
            <div class="form-group">
                <label for="">Responsable</label>
                <input type="text" v-model="team.resp_email" disabled class="form-control" name="email">
                <router-link :to="{ name: 'team/changeuser', params: { id:team.id }}" style="margin-top:10px;" class="btn btn-sm btn-primary">Change responsable</router-link>
            </div>
            
            <!-- <button type="submit" @click="handleSubmit" class="btn btn-primary">Modifier</button> -->
        </form>
    </div>
</template>

<script>
import config from "../../../config.js";
export default {
    data(){
        return {
            idTeam: 0,
            team : {}
        }
    },
    created(){
        this.idTeam = this.$router.history.current.params.id
        this.getTeamInfo()
    },
    methods:{
        getTeamInfo(){
            this.$http
          .get(config.urlApi + `/teams/${this.idTeam}`)
          .then(response => {
            const result = JSON.parse(response.data.team);
            this.team = result[this.idTeam+"team"]
          });
        }
    }
}
</script>

