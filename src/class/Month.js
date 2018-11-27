var moment = require('moment');


export default class Month{

    constructor(year, month, allDemande){
        this.year = year
        this.month = month
        this.start = new Date(this.year,this.month)
        this.allDemande = allDemande
    }

    getName(){
        return this.start.toLocaleString("fr-fr", {month:'long'})
    }

    contains(date){
        return date.getMonth() === this.month
    } 

    getDate(allDemande){
        
        let days = []
        let dayOfWeek = this.start.getDay() - 1
        if(dayOfWeek === -1) dayOfWeek = 6 
        if(dayOfWeek > 0){
            for(let i = dayOfWeek; i>0;i--){
                let result = {}
                let date = this.clone(this.start)
                date.setDate(i * -1 + 1)
                result.date = date
                result.demande = ""
                days.push(result)
            }
        }
        let end = this.clone(this.start)
        end.setMonth(end.getMonth()+1)
        end.setDate(0)
        for(let i= 0;i<end.getDate();i++){
            let result = {}
            let date = this.clone(this.start)
            date.setDate(i+1)
            result.date = date
            result.demande = ""
            allDemande.forEach((e) => {
                let dateStart = new Date(e.dateStart).setHours(0,0,0,0)
                let dateEnd = new Date(e.dateEnd).setHours(0,0,0,0)
                if(date.getTime() == new Date(dateStart).getTime() || date.getTime() == new Date(dateEnd).getTime()){
                    result.demande = e
                }
            })
            days.push(result)
        }
        dayOfWeek = end.getDay() - 1
        if(dayOfWeek === -1) dayOfWeek = 6 
        if(dayOfWeek < 6){
            for(let i = 0; i<(6 - dayOfWeek);i++){
                let result = {}
                let date = this.clone(end)
                date.setDate(end.getDate() + i + 1)
                result.date = date
                result.demande = ""
                days.push(result)
            }
        }
        return days;
    }

    clone(date){
        return new Date(date.getTime())
    }

    static createMonthForYear(year){
        let months = []
        for(let i = 0; i < 12; i++){
            months.push(new Month(year,i))
        }
        return months
    }

} 