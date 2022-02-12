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
                    this.calculator_output.value = ''
                }
            },
            "2":{
                onclick: (e) => {
                    this.calc_mode_toggle(e);
                    

                }
            },
            "3":{
                onclick: () => {
                    this.calculator_output.value += ' % '
                }
            },
            "4":{
                onclick: () => {
                    this.calculator_output.value += ' / '
                }
            },
            "5":{
                onclick: () => {
                    this.calculator_output.value += '7'
                }
            },
            "6":{
                onclick: () => {
                    this.calculator_output.value += '8'
                }
            },
            "7":{
                onclick: () => {
                    this.calculator_output.value += '9'
                }
            },
            "8":{
                onclick: () => {
                    this.calculator_output.value += ' * '
                }
            },
            "9":{
                onclick: () => {
                    this.calculator_output.value += '4'
                }
            },
            "10":{
                onclick: () => {
                    this.calculator_output.value += '5'
                }
            },
            "11":{
                onclick: () => {
                    this.calculator_output.value += '6'     
                }
            },   
            "12":{
                onclick: () => {
                    this.calculator_output.value += ' - '
                }
            },
            "13":{
                onclick: () => {
                    this.calculator_output.value += '1'
                }
            },
            "14":{
                onclick: () => {
                    this.calculator_output.value += '2'
                }
            },
            "15":{
                onclick: () => {
                    this.calculator_output.value += '3'
                }
            },
            "16":{
                onclick: () => {
                    this.calculator_output.value += ' + '
                }
            },
            "17":{
                onclick: () => {
                    this.calculator_output.value += '0'
                }
            },
            "18":{
                onclick: () => {
                    this.calculator_output.value += '.'
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
        this.calendar_day_container = this.getElementsByClassName('day-container')[0]
        this.calendar_cols = this.getElementsByClassName('calendar-cols')[0]
        this.month = this.get_month();
        this.month_offset = this.get_month_offset();

        this.day_offset = this.get_day_offset(this.date.getDay());
        this.set_calendar_title(this.month);
        this.highlight_day(Number(this.date.getDay()));
        this.sunday_position = this.get_last_sunday()

        var first_month_day = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toString().slice(0,4).toLowerCase();
        console.log(this.week_days.findIndex(x => x.toString() === first_month_day));

        for(var i = 0; i < this.week_days.length; i++){
            this.calendar_cols.innerHTML += `<p>${this.week_days[i]}</p>`;
        }

        for(var i = 0; i < this.day_offset; i++){
            this.prepend_days()
        }

        for(var key in this.buttons){
            this.add_calendar_day(key)
        }
    }

    set_calendar_title(title){
        this.calendar_title.innerHTML = title
    }

    add_calendar_day(day){
        this.calendar_day_container.innerHTML += `<div class="calendar-day"><p>${day}</p></div>`
    }

    get_last_sunday() {
        var today = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        return  new Date(today.setDate(today.getDate()-today.getDay())).toString().slice(8, 10);;
    }


    get_day_offset(x){
        return(x % 7)
    }

    get_month_offset(){
        //get first day of month eg: 'tue',
        //get index of that from array
        this.first_month_day = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toString().slice(0,4).toLowerCase();
        
        let index = this.week_days.findIndex(rank => rank === this.first_month_day);
        console.log(index)
    }

    prepend_days(){
        var day = document.createElement('div');
        day.classList.add('calendar-day', 'secondary');
        this.calendar_day_container.prepend(day)
    }

    get_month(){
        return this.months[this.date.getMonth()];
    }

    highlight_day(x){
        var index = parseInt(x + this.day_offset);
        console.log(index)
        console.log(this.getElementsByClassName('calendar-day'))
        var e = this.getElementsByClassName('calendar-day');
        setTimeout(() =>{
            e[index].classList.add('outline')
        }, 100)
    }


}
window.customElements.define('custom-calendar', Calendar);
export {Calendar}
