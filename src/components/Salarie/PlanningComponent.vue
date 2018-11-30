<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Planning</h1>
    </div>
    <div class="alert alert-warning" role="alert">
        Seulement les demandes de l'utilsateur en cours sont prisent en compte
    </div>
    <range-picker :year="2018" :all-demande="allDemande"/>
  </div>
</template>

<script>
import RangePicker from "../Utils/Rangepickercomponent.vue"
import config from "../../../config.js";
var moment = require('moment');

export default {
    data: ()=>{
        return {
            allDemande : [],
            user: {}
        }
    },
    components:{
        RangePicker
    },
    mounted (){
        
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.launchGetDemande()        
    },
    methods:{
        async launchGetDemande() {
            setInterval(() => {
            this.$http
                .get(config.urlApi + `/users/${this.user.id}/asking`)
                .then(response => {
                    const arrayResult = []
                    response.data.demande.forEach((demande) => {
                        var tmpDemande = {}
                        tmpDemande = demande
                        tmpDemande["dateStart"] = demande.dateStart
                        tmpDemande["dateEnd"] = demande.dateEnd
                        arrayResult.push(tmpDemande)
                    })
                    this.allDemande = arrayResult
            });
          },1000)
        }
    }
}
</script>


<style scoped>
</style>
