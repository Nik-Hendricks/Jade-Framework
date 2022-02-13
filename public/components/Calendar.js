import {Component} from '/components/Component.js';

class Calendar extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('calendar');
        this.date = new Date();
        this.buttons = {
            "1":{
                onclick: () => {
                    
                }
            },
            "2":{
                onclick: (e) => {
                   
                }
            },
            "3":{
                onclick: () => {
                    
                }
            },
            "4":{
                onclick: () => {
                    
                }
            },
            "5":{
                onclick: () => {
                    
                }
            },
            "6":{
                onclick: () => {
                    
                }
            },
            "7":{
                onclick: () => {
                    
                }
            },
            "8":{
                onclick: () => {
                   
                }
            },
            "9":{
                onclick: () => {
                   
                }
            },
            "10":{
                onclick: () => {
                    
                }
            },
            "11":{
                onclick: () => {
                      
                }
            },   
            "12":{
                onclick: () => {
                    
                }
            },
            "13":{
                onclick: () => {
                
                }
            },
            "14":{
                onclick: () => {
                
                }
            },
            "15":{
                onclick: () => {
                
                }
            },
            "16":{
                onclick: () => {
                
                }
            },
            "17":{
                onclick: () => {
                
                }
            },
            "18":{
                onclick: () => {
                
                }
            },
            "19":{
                onclick: () => {
            
                },
            },
            "20":{
                onclick: () => {
            
                },
            },
            "21":{
                onclick: () => {
            
                },
            },
            "22":{
                onclick: () => {
            
                },
            },
            "23":{
                onclick: () => {
            
                },
            },
            "24":{
                onclick: () => {
            
                },
            },
            "25":{
                onclick: () => {
            
                },
            },
            "26":{
                onclick: () => {
            
                },
            },
            "27":{
                onclick: () => {
            
                },
            },
            "28":{
                onclick: () => {
            
                },
            },
            "29":{
                onclick: () => {
            
                },
            },
            "30":{
                onclick: () => {
            
                },
            },
            "31":{
                onclick: () => {
            
                },
            },
        }

        this.week_days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        this.week_day = this.week_days[this.date.getDay()]
    
        this.innerHTML = `<p class="calendar-title"></p>
                        <div class="calendar-cols">
                        </div>
                        <div class="day-container">
                        </div>`

        this.calendar_title = this.getElementsByClassName('calendar-title')[0];
        this.calendar_day_container = this.getElementsByClassName('day-container')[0];
        this.calendar_cols = this.getElementsByClassName('calendar-cols')[0];

        this.cal_data = {
            'feb':{
                '13':{
                    type:'reminder',
                    text:'test reminder'
                }
            }
        }

        this.month = this.get_month();
        this.day_num = this.date.getDate()
        console.log(this.day_num)
        this.first_day_offset = this.get_first_day_offset();
        this.set_calendar_title(this.month);
        
        this.sunday_position = this.get_last_sunday()

      
        for(var i = 0; i < this.week_days.length; i++){
            this.calendar_cols.innerHTML += `<p>${this.week_days[i]}</p>`;
        }

        this.append_calendar_days().then(res => {
            this.highlight_day(res, this.day_num);

        })
    }

    append_calendar_days(){
        return new Promise(async(resolve) => {
            for(var i = 0; i < this.first_day_offset; i++){
                this.prepend_day()
            }
            for(var key in this.buttons){
                this.append_day(key)
            }
            return resolve(this.calendar_day_container.children)
        })
    }

    set_calendar_title(title){
        this.calendar_title.innerHTML = title
    }

    get_last_sunday() {
        var today = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        return  new Date(today.setDate(today.getDate()-today.getDay())).toString().slice(8, 10);;
    }

    get_day_offset(x){
        return(x % 7)
    }

    get_first_day_offset(){
        var first_month_day = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toString().slice(0, 3).toLowerCase();
        return this.week_days.indexOf(first_month_day);
    }

    prepend_day(){
        var day = document.createElement('div');
        day.classList.add('calendar-day', 'secondary');
        this.calendar_day_container.prepend(day)
    }

    append_day(day_num){
        var day = document.createElement('div');
        day.classList.add('calendar-day');
        day.innerHTML = `<p>${day_num}</p>`
        this.calendar_day_container.append(day)
    }

    get_month(){
        return this.months[this.date.getMonth()];
    }

    highlight_day(e, x){
        var index = parseInt(x + this.first_day_offset - 1);
        e[index].classList.add('outline')
    }


}

class Day{

}
window.customElements.define('custom-calendar', Calendar);
export {Calendar}
