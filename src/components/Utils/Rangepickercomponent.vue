<template>
    <div class=range_picker>
        <div class="range_picker_month" v-for="month in months ">
            <div class="range_picker_title_month">
                <p>{{ month.getName()}}</p>
            </div>
            <div class="range_picker_days">
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div>Sam</div>
                <div>Dim</div>
            </div>
            <div class="range_picker_numbers">
                <div class="range_picker_day" :class="[classForDay(day.date,month),showDemande(day.demande)]" v-for="day in month.getDate(allDemande)">
                    <p>{{day.date.getDate()}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Month from "../../class/Month.js";
export default {
  data() {
    return {
      months: []
    };
  },
  mounted() {
    this.months = Month.createMonthForYear(this.year, this.allDemande);
  },
  props: {
    year: Number,
    allDemande: Array
  },
  methods:{
      classForDay(day, month){
          let classes = []
          if(!month.contains(day)){
              classes.push("rangepicker_out")
          }
          return classes
      },
      showDemande(demande){
          let classes = []
          if(demande != ""){
              classes.push("rangepicker_event")
              if(demande.validation == "pending"){
                classes.push("range_picker_waiting")
              }else if(demande.validation == "refused"){
                  classes.push("range_picker_refused")
              }
          }
          return classes
      }
  }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
  display:flex;
    flex-wrap: wrap;
}
.range_picker_month{
    width:25%;
    background-color: #fff;
    border:1px solid #000;
}
.range_picker_title_month{
    width: 100%;
    height:64px;
    line-height: 64px;
    background-color: #455399;
    color:white;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1rem;
}
.range_picker_title_month p{
    display:block;
    text-align: center;
    width:100%;
}
.range_picker_days{
    width: 100%;
    height: 30px;
    color:#b7c1cd;
    font-size:  0.9rem;
    font-weight: bold;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-evenly
}
.range_picker_numbers{
    display: flex;
    width: 100%;   
    flex-wrap: wrap;
    color:#2b2e49;
    line-height: 48px;
}
.range_picker_day{
    width: 14%;
    justify-content: space-around;
    position: relative;
}
.rangepicker_out{
    opacity:0.5
}
.rangepicker_event{
    color:white;
}
.range_picker_day p{
    z-index:1;
}
.rangepicker_event::after {
    content: "";
    background: blue;
    width: 25px;
    position: absolute;
    top: 0.72em;
    left: 0.5em;
    height: 25px;
    border-radius: 50%;
}

.range_picker_waiting::after{
    background: #ffc107;
}
.range_picker_refused::after{
    background: #dc3545;
}
</style>


