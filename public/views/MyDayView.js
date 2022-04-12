import {View} from '/views/View.js';

class MyDayView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view');
        window.API2.get_day_events(new Date().getDate()).then(events => {
            var day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day_num = new Date().getDate();
            var day_in_week_num = new Date().getDay();
            this.innerHTML = /*html*/` 
            <card-item width="6" style="height:200px;">
                <h1 style="margin:0; width:100%; float:left; position:absolute; text-align:center; height:40px; font-size:40px; margin-top:100px; top:-20px; color:var(--theme-primary-color);">${day_num}</h1>
                <p style="margin:0; width:100%; text-align:center; float:left; position:absolute; bottom:var(--global-margin);">${day_names[day_in_week_num]}</p>
            </card-item>


            <card-item width="6" style="height:200px;">
            </card-item>
            <custom-input width="4" type="button" icon="settings" text="Settings" onclick="window.history.pushState('','','/Settings')"></custom-input>
            <custom-input width="4" type="button" icon="info" text="text"></custom-input>
            <custom-input width="4" type="button" icon="info" text="text"></custom-input>
            <card-item>
                <h1 style="width:100%; text-align:center; font-size:20px; color:var(--theme-secondary-color);">Todays Events</h1>

                <card-item width="4" style="height:30px; background:var(--theme-background-color);">
                    <p style="padding:0px; text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">Name</p>
                </card-item>
                <card-item width="3" style="height:30px; background:var(--theme-background-color);">
                    <p style="padding:0px;  text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">Start Time</p>
                </card-item>
                <card-item width="3" style="height:30px; background:var(--theme-background-color);">
                    <p style="padding:0px;  text-align:center; width:100%; position:absolute; top:8px; margin:0px; height:30px; font-size:13px;">End Time</p>
                </card-item>
                <card-item width="2" style="height:30px; background:var(--theme-background-color);">
                </card-item>


            </card-item>

           `
            events.forEach(event => {
                this.getElementsByTagName('card-item')[2].innerHTML += this.daily_schedule_row_item(event);
            })

            window.DP.dispatch("VIEW_LOAD");
        })
    }

    daily_schedule_row_item(event){
        var start_time = this.format_time(event.start_time);
        var end_time = this.format_time(event.end_time);
        return(/*html*/`
        <card-item width="4" style="max-height:37px; background:var(--theme-background-color);">
            <p style="padding:0; margin:0; margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${event.name}</p>
        </card-item>
        <card-item width="3" style="max-height:37px; background:var(--theme-background-color);">
            <p style="padding:0; margin:0; margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${start_time}</p>
        </card-item>
        <card-item width="3" style="max-height:37px; background:var(--theme-background-color);">
            <p style="padding:0;  margin:0;margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${end_time}</p>
        </card-item>
        <card-item width="2" style="max-height:37px; background:var(--theme-background-color);">
            <span class="material-icons" style="margin:0; margin-left:50%; left:-7px; font-size:14px; position:relative; margin-bottom:10px;color:var(--theme-primary-color);">
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
window.customElements.define('my-day-view', MyDayView);
export{MyDayView};