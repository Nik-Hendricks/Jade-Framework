import {View} from '/views/View.js';

class ScheduleView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view');
        this.innerHTML = /*html*/`
                                <custom-input type="dropdown" width="12" text="Default" icon="info" dropdown_icons="info"></custom-input>
                                <custom-calendar>
                                </custom-calendar>
                                <card-item style="height:50px;" width="3" blank></card-item>
                                <card-item style="height:50px;" width="6" blank>
                                    <p style="padding:0px; margin:0; position:absolute; top:15px; text-align:center; width:100%; height:17px; font-size:17px;" class="day-text"></p>
                                </card-item>
                                <card-item style="height:50px;" width="3" blank></card-item>
                                <card-item width="4" style="height:30px;">
                                    <p style="padding:0px; text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">Name</p>
                                </card-item>
                                <card-item width="3" style="height:30px;">
                                    <p style="padding:0px;  text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">Start Time</p>
                                </card-item>
                                <card-item width="3" style="height:30px;">
                                    <p style="padding:0px;  text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">End Time</p>
                                </card-item>
                                <card-item width="2" style="height:30px;">
                                </card-item>
                                <div class="events-container"></div>`

        this.color_mode = 'default'
        this.cal_view = this.getElementsByTagName('custom-input')[0]
        this.calendar = this.getElementsByTagName('custom-calendar')[0]
        this.events_container = this.getElementsByClassName('events-container')[0]
        this.day_text = this.getElementsByClassName('day-text')[0]
        this.append_daily_schedule(this.calendar.current_day_num)

        this.calendar.on_date_clicked(date => {                
            this.append_daily_schedule(date.day_num)
            this.apply_highlight_mode(date.day_num);
            
            this.day_text.innerHTML = `Events for ${this.calendar.selected_date.day}`
        })

        this.calendar.on_month_changed(date => {
            console.log(date)
            this.day_text.innerHTML = `Events for ${this.calendar.selected_date.day}`
            this.apply_highlight_mode(date.day_num);
        })

        this.cal_view.items = ['Heatmap', 'Colormap', 'Default'];

        this.cal_view._on_change(e => { 
            if(e == "Heatmap"){
                this.color_mode = 'heatmap'
            }
            if(e == "Colormap"){
                this.color_mode = 'colormap'
            }
            if(e == "Default"){
                this.color_mode = 'default';
            }
            this.apply_highlight_mode(this.calendar.selected_date)
        });

        window.DP.dispatch("VIEW_LOAD");
    }

    apply_highlight_mode(date){
        if(this.color_mode == "heatmap"){
            this.calendar_highlight_heatmap();
        }
        if(this.color_mode == "colormap"){
            this.calendar_highlight_colormap();
        }if(this.color_mode == 'default'){
            this.calendar.clear_day_highlights();
            this.calendar.highlight_day(date, 'var(--theme-secondary-color)')
        }
    }

    normalize(val, max, min) { return (val - min) / (max - min); }

    heatMapColor(value){
        var h = (1.0 - value) * 240
        return "hsl(" + h + ", 100%, 50%)";
    }

    heat_map_color(i){
        var low = '#1d4877';
        var med_low = '#1b8a5a';
        var med = '#fbb021';
        var med_high = '#f68838';
        var high = '#ee3e32';
        var color = low;
        
        if(i >= .2){
            color = med_low;
        }
        if(i >= .4){
            color = med;
        }
        if(i >= .6){
            color = med_high;
        }
        if(i >= .8){
            color = high;
        }
        
        return color;
    }

    calendar_highlight_heatmap(){
        (async () => {
            var highlights = this.calendar.construct_initial_date_array();
            for(var i = 1; i < this.calendar.days_in_month + 1; i++){                 
                await window.API2.get_day_events(String(i)).then(events => {
                    highlights[this.calendar.selected_date.month][i] = {color: this.heat_map_color(this.normalize(events.length, 10, 0))}
                })
            }
            this.calendar.highlight_dates(highlights)
        })();
    }
    
    calendar_highlight_colormap(){
        (async () => {
            var highlights = this.calendar.construct_initial_date_array();
            for(var i = 1; i < this.calendar.days_in_month + 1; i++){                 
                await window.API2.get_day_events(String(i)).then(events => {
                    console.log(events);
                    if(events[0] != undefined){
                        highlights[this.calendar.selected_date.month][i] = {color: events[0].color}
                    }
                })
            }
            this.calendar.highlight_dates(highlights)
        })();
    }

    append_daily_schedule(date){
        window.API2.get_day_events(date).then(events => {
            this.events_container.innerHTML = '';
            if(events.length > 0){
                events.forEach(event => {
                    this.events_container.innerHTML += this.daily_schedule_row_item(event);
                })
            }else{
                this.events_container.innerHTML = ` <card-item style="height:50px;" width="12">
                                                        <p style="padding:0px; margin:0; position:absolute; top:15px; text-align:center; width:100%; height:17px; font-size:17px;">No Events Scheduled</p>
                                                    </card-item>`
            }
            this.resizeComponents(true)
        })
    }

    daily_schedule_row_item(event){
        var start_time = this.format_time(event.start_time);
        var end_time = this.format_time(event.end_time);
        return(/*html*/`
        <card-item width="4" style="height:50px;">
            <p style="padding:0; margin-top:5px; color:${event.color};text-align:center; font-size: 16px;">${event.name}</p>
        </card-item>
        <card-item width="3" style="height:50px;">
            <p style="padding:0; margin-top:5px; color:${event.color};text-align:center; font-size: 16px;">${start_time}</p>
        </card-item>
        <card-item width="3" style="height:50px;">
            <p style="padding:0; margin-top:5px; color:${event.color};text-align:center; font-size: 16px;">${end_time}</p>
        </card-item>
        <card-item width="2" style="height:50px;">
            <span class="material-icons" style="margin:auto; margin-left:50%; left:-10px; font-size:20px; position:relative; margin-top:5px;color:var(--theme-primary-color);">
            info
            </span>
        </card-item>`)
    }

    format_time(time){
        if(time.length > 3){
            var hour = time.slice(0, 2);
            var mins = time.slice(2,4);
        }else{
            var hour = time.slice(0, 1);
            var mins = time.slice(1,3);
        }
        return (hour > 12) ? String(hour - 12).concat(":",mins," PM"): String(hour).concat(":", mins, " AM") ;
    }
}
window.customElements.define('schedule-view', ScheduleView);
export{ScheduleView};