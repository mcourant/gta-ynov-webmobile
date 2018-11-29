<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Liste des demandes</h1>
        </div>
    
      <!-- <div class="allDemande" style="margin-top:20px;">
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
          </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>
