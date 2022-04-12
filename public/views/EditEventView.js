import {View} from '/views/View.js';

class EditEventView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view');
        this.event_types = ['work', 'personal', 'relaxation','smoke break', 'meeting', 'birthday']
        this.frequencies = ['hourly','daily', 'monthly'];
        this.colors = ['red','orange', 'yellow','green','blue','indigo','violet']


        this.innerHTML = `  
                            <custom-input id="event_name" type="text" placeholder="Event Name" in_row="1"></custom-input>
                            <custom-input width="6" id="event_type" type="dropdown" text="Type" icon="info" dropdown_icons="info"></custom-input>
                            <custom-input width="6" id="event_color" type="color" text="Color"></custom-input>
                            <h5>Start Time</h5>
                            <custom-input width="2" id="start_time_hour" type="text" placeholder="00" number></custom-input>
                            <custom-input width="2" id="start_time_minute" type="text" placeholder="00" number></custom-input>
                            <custom-input width="8" id="start_event_am_pm" type="dropdown"  icon="schedule" dropdown_icons="schedule" text="Select One"></custom-input>
                            <h5>End Time:</h5>
                            <custom-input width="2" id="end_time_hour" type="text" placeholder="00" number></custom-input>
                            <custom-input width="2" id="end_time_minute" type="text" placeholder="00" number></custom-input>
                            <custom-input width="8" id="end_event_am_pm" type="dropdown" width="6" icon="schedule" dropdown_icons="schedule" text="Select One"></custom-input>
                            <custom-calendar></custom-calendar>
                            <h5>Notes:</h5>
                            <custom-input id="notes" type="textarea" rows="10" placeholder="Some notes..."></custom-input>
                            <custom-input id="add_event_button" type="button" text="Add Event" icon="add"></custom-input>
                      `
        var event_name = document.getElementById('event_name');
        var event_type_dropdown = document.getElementById('event_type');
        var event_color_dropdown = document.getElementById('event_color');
        var start_time_hour = document.getElementById('start_time_hour');
        var start_time_minute = document.getElementById('start_time_minute');
        var end_time_hour = document.getElementById('end_time_hour');
        var end_time_minute = document.getElementById('end_time_minute');
        var start_am_pm_dropdown = document.getElementById('start_event_am_pm');
        var end_am_pm_dropdown = document.getElementById('end_event_am_pm');
        var date_calendar = this.getElementsByTagName('custom-calendar')[0];
        var add_event_button = document.getElementById('add_event_button');

        event_type_dropdown.items = this.event_types
        start_am_pm_dropdown.items = ["AM", "PM"];
        end_am_pm_dropdown.items = ["AM", "PM"];
        this.selected_days = [];
        date_calendar.on_date_clicked(_date => {
            var day_num = _date.day_num;
            console.log(day_num)
            if(this.selected_days.includes(day_num)){
                this.selected_days = this.selected_days.filter(item => item !== day_num)
                date_calendar.clear_day_highlight(day_num)
            }else{
                console.log(_date)
                this.selected_days.push(day_num);
                date_calendar.highlight_day(day_num, 'var(--theme-secondary-color)')
            }
            console.log(this.selected_days)
        })

        add_event_button.onclick = () => {
            if(this.selected_days.length <= 0 || event_name.value == undefined || event_type_dropdown.value == undefined || event_color.value == undefined || start_time_hour.value == undefined || start_time_minute.value == undefined || start_am_pm_dropdown.value == undefined || end_time_hour.value == undefined || end_time_minute.value == undefined || end_am_pm_dropdown.value == undefined){
                alert("fill all inputs")
            }else{
                var start_time = (start_event_am_pm.value == "PM") ? start_time = String(12 + Number(start_time_hour.value)).concat(start_time_minute.value) : start_time_hour.value.concat(start_time_minute.value);
                var end_time = (end_event_am_pm.value == "PM") ? end_time = String(12 + Number(end_time_hour.value)).concat(end_time_minute.value) : end_time_hour.value.concat(end_time_minute.value);
                window.API2.new_event(event_name.value, event_type_dropdown.value, start_time, end_time, this.selected_days, notes.value, event_color_dropdown.value).then(res => {
                    console.log(res);
                })
            }
        }
       
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('edit-event-view', EditEventView);
export{EditEventView};