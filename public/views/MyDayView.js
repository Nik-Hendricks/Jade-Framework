import {View} from '/views/View.js';

class MyDayView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view');
        window.API2.get_day_events(new Date().getDate()).then(events => {
            var day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
            var day_num = new Date().getDate();
            var month_num = new Date().getMonth();
            var day_in_week_num = new Date().getDay();



            this.innerHTML = /*html*/` 

            <card-item width="6" style="height:200px;">
                <h2 style="margin:0; width:100%; text-align:center; float:left; position:absolute; margin-top:var(--global-margin);">${day_names[day_in_week_num]}</h2>
                <h1 style="margin:0; width:100%; float:left; position:absolute; text-align:center; height:40px; font-size:40px; margin-top:100px; top:-20px; color:var(--theme-primary-color);">${month_names[month_num]}</h1>
                <h2 style="margin:0; width:100%; text-align:center; float:left; position:absolute; bottom:var(--global-margin); color:var(--theme-primary-color);">${day_num}<b style="color:var(--theme-secondary-color);">${window.Utils.nth(day_num)}</b></h2>
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
                this.getElementsByTagName('card-item')[2].innerHTML += window.Builder.daily_schedule_row_item(event);
            })

            window.DP.dispatch("VIEW_LOAD");
        })
    }


}
window.customElements.define('my-day-view', MyDayView);
export{MyDayView};