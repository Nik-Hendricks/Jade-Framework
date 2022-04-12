import {Component} from '/components/Component.js';
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

class SimpleDate{
    constructor(_date){
        var date = String(_date);
        this._day = date.slice(0,3);
        this._day_num = Number(date.slice(8, 10));
        this._month = date.slice(4, 7).toLowerCase();
        this._month_num = Number(months.indexOf(this.month) + 1);
        this._year = Number(date.slice(11, 15));
        this._min = Number(date.slice(19, 21));
        this._hour = Number(date.slice(16, 18));
        
    }

    set day(_day){
        this._day = Number(_day);
    }

    get day(){
        return this._day;
    }

    set day_num(_day_num){
        this._day_num = Number(_day_num);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        console.log(this.date_string(_day_num, this._month_num, this._year))
        this._day = String(days[new Date(this.date_string(_day_num, this._month_num, this._year)).getDay()])
    }

    get day_num(){
        return this._day_num;
    }

    set month(_month){
        this._month = String(_month).toLowerCase();
        this._month_num = Number(months.indexOf(this._month) + 1);
    }

    get month(){
        return this._month;
    }

    set month_num(_month_num){
        this._month_num = Number(_month_num);
        this._month = String(months[this._month_num]).toLowerCase();
    }

    get month_num(){
        return this._month_num;
    }

    set year(_year){
        this._year = Number(_year);
    }

    get year(){
        return this._year;
    }

    set min(_min){
        this._min = Number(_min);
    }

    get min(){
        return this._min;
    }

    set hour(_hour){
        this._hour = Number(_hour);
    }   

    get hour(){
        return this._hour;
    }
    
    date_string(day, month, year){
        return `${month}/${day}/${year}`
    }
}

class Calendar extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('calendar');
        this.week_days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.selected_date = new SimpleDate(new Date());
        this.cal_data = this.construct_initial_date_array();
    
        this.innerHTML = `
                        <div class="calendar-controls">
                            <span class="material-icons prev-month">navigate_before</span>
                            <p class="title"></p>
                            <span class="material-icons next-month">navigate_next</span>
                        </div>
                        <div class="calendar-cols">
                        </div>
                        <div class="day-container">
                        </div>
                        <div class="date-info-container">
                        </div>
                        `
 

        this.calendar_title = this.getElementsByClassName('title')[0];
        this.calendar_day_container = this.getElementsByClassName('day-container')[0];
        this.calendar_cols = this.getElementsByClassName('calendar-cols')[0];
        this.next_button = this.getElementsByClassName('next-month')[0];
        this.prev_button = this.getElementsByClassName('prev-month')[0];
        this.date_info_container = this.getElementsByClassName('date-info-container')[0];

        this.open_calendar(); 


        this.next_button.onclick = () => {
            this.selected_date.month_num = (this.selected_date.month_num + 1 > 11) ? 0: this.selected_date.month_num + 1;
            this.open_calendar(this.selected_date.month)   
            this.fire_month_change_event();
        }

        this.prev_button.onclick = () => {
            this.selected_date.month_num = (this.selected_date.month_num - 1 < 0) ? 11: this.selected_date.month_num- 1;
            this.open_calendar(this.selected_date.month)       
            this.fire_month_change_event();
        }
    }
    
    open_calendar(month){
        var _month = (month) ? month : this.selected_date.month;
        this.construct_calendar(_month)
    }

    highlight_dates(data, _month){
        var month = (_month) ? _month : this.selected_date.month;
        return new Promise(async (resolve) => {
            if(data[month]){
                var month_data = data[month];
                this.cal_data[month] = month_data;
                for(var key in month_data){
                    var day_to_highlight = Number(key)
                    var color = String(month_data[key].color)
                    this.highlight_day(day_to_highlight, color, month)
                }
                return resolve()
            }
        })
    }

    fire_month_change_event(){
        var event = document.createEvent("HTMLEvents");
        event.initEvent("monthChange", true, true);
        event.eventName = "monthChange";
        this.dispatchEvent(event)
    }

    construct_calendar(_month){
        return new Promise(async (resolve) => {
            var month = this.selected_date.month;
            var month_number = months.indexOf(month);
            var year = 2022;
            if(_month){
                month = _month
                month_number = months.indexOf(month) + 1;
            }
            this.set_calendar_title(month);
            this.append_calendar_days(month_number, year).then(res => {
                return resolve(res)
            })
        })
    }

    append_calendar_days(month_number, year){
        return new Promise(async(resolve) => {
            this.first_day_offset = this.get_first_day_offset(month_number - 1)
            this.days_in_month = Number(new Date(year , month_number, 0).getDate());
            //clear containers so we have a fresh container
            this.calendar_cols.innerHTML = '';
            this.calendar_day_container.innerHTML = ''
            //append week days at the top
            for(var i = 0; i < this.week_days.length; i++){
                this.calendar_cols.innerHTML += `<p>${this.week_days[i]}</p>`;
            }
            //append blank first days
            for(var i = 0; i < this.first_day_offset; i++){
                this.append_day()
            }

            for(var i = 1; i <= this.days_in_month; i ++){
                this.append_day(i)
            }

            return resolve(this.calendar_day_container.children)
        })
    }

    set_calendar_title(title){
        this.calendar_title.innerHTML = title
    }

    //returns how many blank days there are before the 1st of each month
    get_first_day_offset(month){
        var first_month_day = new Date(this.selected_date.year, month, 1).toString().slice(0, 3).toLowerCase();
        return this.week_days.indexOf(first_month_day);
    }

    prepend_day(){
        var day = document.createElement('div');
        day.classList.add('calendar-day', 'secondary');
        this.calendar_day_container.prepend(day)
    }

    append_day(day_num){
        var day = document.createElement('div');
        if(!day_num){
            day.classList.add('calendar-day', 'secondary');
        }else{
            day.classList.add('calendar-day');
            day.innerHTML = `<p>${day_num}</p>`
        }

        this.calendar_day_container.append(day)
    }

    get_month(month){ 
        return months[month];
    }

    outline_day(x){
        var index = parseInt(x + this.first_day_offset - 1);
        this.calendar_day_container.getElementsByClassName('calendar-day')[index].classList.add('outline')
    }

    highlight_day(x, color, month){
        if(!month){
            month = this.selected_date.month;
        }
        this.cal_data[month][x] = {color: color};
        var first_day_offset = this.get_first_day_offset(months.indexOf(month))
        var index = parseInt(x + first_day_offset - 1);
        var day = this.calendar_day_container.getElementsByClassName('calendar-day')[index]
        day.style.backgroundColor = color;
    }

    clear_day_highlights(){
        var days = this.calendar_day_container.getElementsByClassName('calendar-day')
        for(var i = 0; i < days.length; i++){
            days[i].style.backgroundColor = ''
        }
    }

    clear_day_highlight(x, _month){
        var month = (_month) ? _month : this.selected_date.month;
        var first_day_offset = this.get_first_day_offset(months.indexOf(month))
        var index = parseInt(x + first_day_offset - 1);
        var day = this.calendar_day_container.getElementsByClassName('calendar-day')[index]
        day.style.backgroundColor = '';
    }

    on_date_clicked(callback){
        var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

         //Then we bind via thát event. This way we only bind one event, instead of the two as below
        this.addEventListener(touchEvent, (e) => {
            var target = e.target.parentNode
            var click_path_class = target.className
            if(click_path_class == 'calendar-day'){
                this.selected_date.day_num = target.innerText
                callback(this.selected_date);
            }
        });
    }

    on_month_changed(callback){
        this.addEventListener('monthChange', () => {
            //this.open_calendar(this.selected_date.month)
            callback(this.selected_date);
        })
    }

    toggle_highlight(x, color, _month){
        var month = (_month) ? _month : this.selected_date.month;
        var day = this.calendar_day_container.getElementsByClassName('calendar-day')[x];
        var bg_color = window.getComputedStyle(day ,null).getPropertyValue('background-color')
        if(bg_color != 'rgb(112, 111, 211)'){
            this.clear_day_highlight(x, month);
        }else{
            this.highlight_day(x, color);
        }
    }

    construct_initial_date_array(){
        return {"jan":{}, "feb":{}, "mar":{} , "apr":{}, "may":{}, "jun":{}, "jul":{}, "aug":{}, "sep":{}, "oct":{}, "nov":{}, "dec":{}};;
    }

}

class Day{

}
window.customElements.define('custom-calendar', Calendar);
export {Calendar}
