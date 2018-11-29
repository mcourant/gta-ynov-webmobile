<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Change user</h1>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Choose ?</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in allUsers" v-bind:key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.email}}</td>
                  <td>
                        <button class="btn btn-sm btn-primary" @click="changeUser(user)">Change responsable</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="alert alert-primary text-center" role="alert" v-if="allUsers.length == 0 && !loading">Aucune user</div>
            <div class="alert alert-primary text-center" role="alert" v-if="loading">Contenu en cours de chargement</div>
        </div>
    </div>
</template>

<script>
import config from "../../../config.js";
export default {
    data (){
        return {
            allUsers : [],
            loading : true,
            idTeam : 0
        }
    },
    created(){
        this.idTeam = this.$router.history.current.params.id
        this.getAllUsers()
    },
    methods:{
        getAllUsers(){
             this.$http
          .get(config.urlApi + `/users`)
          .then(response => {
              this.loading = false
                this.allUsers = response.data.users;
          });
        },
        changeUser(user){
            this.$http
          .post(config.urlApi + `/teams/${this.idTeam}/changeresp`,{
            resp_id: user.id
          })
          .then(response => {
              this.$router.push({
                path: `/dashboard/teams/${this.idTeam}/edit`
            });
          });
        }
    }
}
</script>

