<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Team</h1>
    </div>
    <div class="allDemande" style="margin-top:20px;">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Responsable</th>
              <th>Nbr salarie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in allTeams" v-bind:key="team.id">
              <td>{{team.name}}</td>
              <td>{{team.resp_email}}</td>
              <td>{{team.users.length}}</td>
              <td>
                  <router-link :to="{ name: 'team/edit', params: { id:team.id }}" v-bind:team="team.id"  class="btn btn-sm btn-primary">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="alert alert-primary text-center"
          role="alert"
          v-if="allTeams.length == 0 && !loading"
        >Aucune demande faite</div>
        <div
          class="alert alert-primary text-center"
          role="alert"
          v-if="loading"
        >Contenu en cours de chargement</div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../../config.js";
export default {
  data() {
    return {
      allTeams: [],
      loading: true
    };
  },
  created(){
      this.launchGetTeams()
  },
  methods: {
    launchGetTeams() {
      setInterval(() => {
        this.$http
          .get(config.urlApi + `/teams`)
          .then(response => {
            this.loading = false;
            this.allTeams = JSON.parse(response.data.teams);
          });
      }, 1000);
    }
  }
};
</script>

