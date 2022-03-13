import {Component} from '/components/Component.js';

class Calendar extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('calendar');
        this.date = new Date();
        this.week_days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        this.current_month_index = this.date.getMonth();
        this.current_month_name = this.months[this.current_month_index]
        this.current_day_num = this.date.getDate();
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

        this.open_calendar('mar')

        this.next_button.onclick = () => {
            this.current_month_index += 1;
            this.current_month_name = this.months[this.current_month_index]
            this.open_calendar(this.current_month_name)
        }

        this.prev_button.onclick = () => {
            this.current_month_index -= 1;
            this.current_month_name = this.months[this.current_month_index]
            this.open_calendar(this.current_month_name)
        }
    }
    
    open_calendar(month){
        this.construct_calendar(month)
        var day_num = this.date.getDate();
        if(this.months.indexOf(month) == this.our_month){
            this.outline_day(day_num);
        }
        this.highlight_dates(this.cal_data, month)
    }

    highlight_dates(data, month){
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

    construct_calendar(_month){
        return new Promise(async (resolve) => {
            var month = this.get_month(this.date.getMonth());
            var month_number = this.months.indexOf(month);
            var year = 2022;
            var days_in_month = Number(new Date(year , month_number, 0).getDate());
            if(_month){
                month = _month
                month_number = this.months.indexOf(month) + 1;
                days_in_month = Number(new Date(year , month_number, 0).getDate());
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
            var days_in_month = Number(new Date(year , month_number, 0).getDate());
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

            for(var i = 1; i <= days_in_month; i ++){
                this.append_day(i)
            }

            return resolve(this.calendar_day_container.children)
        })
    }

    set_calendar_title(title){
        this.calendar_title.innerHTML = title
    }

    get_first_day_offset(month){
        var first_month_day = new Date(this.date.getFullYear(), month, 1).toString().slice(0, 3).toLowerCase();
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
        return this.months[month];
    }

    outline_day(x){
        var index = parseInt(x + this.first_day_offset - 1);
        this.calendar_day_container.getElementsByClassName('calendar-day')[index].classList.add('outline')
    }

    highlight_day(x, color, month){
        this.cal_data[month][x] = {color: color};
        var first_day_offset = this.get_first_day_offset(this.months.indexOf(month))
        var index = parseInt(x + first_day_offset - 1);
        var day = this.calendar_day_container.getElementsByClassName('calendar-day')[index]
        day.style.backgroundColor = color;
    }

    on_date_clicked(callback){
        var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

         //Then we bind via thát event. This way we only bind one event, instead of the two as below
        this.addEventListener(touchEvent, (e) => {
            var target = e.target.parentNode
            var click_path_class = target.className
            if(click_path_class == 'calendar-day'){
                var date = target.innerText
                callback(date)
            }
        });


        //this.ontouchstart = (e) => {
        //    alert(e.path[1].className)
        //    var click_path_class = e.path[1].className
        //    if(click_path_class == 'calendar-day'){
        //        var date = e.path[1].firstChild.innerText
        //        callback(date)
        //    }
        //}
    }

    construct_initial_date_array(){
        var retobj = {"jan":{}, "feb":{}, "mar":{} , "apr":{}, "may":{}, "jun":{}, "jul":{}, "aug":{}, "sep":{}, "oct":{}, "nov":{}, "dec":{}};
        return retobj;
    }

}

class Day{

}
window.customElements.define('custom-calendar', Calendar);
export {Calendar}
