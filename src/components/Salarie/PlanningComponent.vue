<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Planning</h1>
    </div>
    <range-picker v-if="allDemande.length != 0" :year="2018" :all-demande="allDemande"/>
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
        }
    }
}
</script>


<style scoped>
</style>
