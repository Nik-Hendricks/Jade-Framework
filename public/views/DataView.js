import {View} from '/views/View.js';

class DataView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        window.API2.events_db.then(events => {
            window.API2.get_day_events(new Date().getDate()).then(day_events => {
                
                    var remaining_events = '1';
                    this.innerHTML = `  ${this.square_card_item(events.length, 'Total Events')}
                                        ${this.square_card_item(day_events.length, 'Events Today')}
                                        ${this.square_card_item(remaining_events, 'Events Left')}
                                    <custom-input type="button" text="New Event" icon="info" onclick="window.history.pushState('','','/Data/Event/New')"></custom-input>
                                    <custom-input type="button" text="New Expense" icon="info" onclick="window.history.pushState('','','/Data/Finances/Expenses/New')"></custom-input>
                                    <custom-input type="button" text="New Income" icon="info" onclick="window.history.pushState('','','/Data/Finances/Income/New')"></custom-input>
                                    <side-scroller style="width:100%;">    

                                    </side-scroller>
                     `
                                    
                                    var sidescroller = this.getElementsByTagName('side-scroller')[0]
                                    sidescroller.root_el.innerHTML += this.big_pie_chart_card();
                                    //sidescroller.root_el.innerHTML += this.big_pie_chart_card();
                                        var _event_types = []
                                        var _event_days = [];
                                        var counter = 0;
                                        if(events.length > 0){
                                            events.forEach(event => {
                                                counter++
                                                if(_event_types[event.type]){
                                                    _event_types[event.type] = {total: _event_types[event.type].total +1}
                                                }else{
                                                    _event_types[event.type] = {total: 1}
                                                }
                                         
                                                event.days.forEach(day => {
                                                    if(_event_days[day]){
                                                        _event_days[day] = {total: _event_days[day].total + 1};
                                                    }else{
                                                        _event_days[day] = {total:1};
                                                    }
                                                })
    
                                                if(counter === events.length){
                                                    var pie = this.getElementsByTagName('pie-chart')[0];
                                                    pie.data = _event_types;
                                                    window.DP.dispatch("VIEW_LOAD");
                                                }
                                            })
                                        }else{
                                            window.DP.dispatch("VIEW_LOAD");
                                        }

                                    
            })
        })
    }


    big_pie_chart_card(){
        return /*html*/ `<card-item width="12">
                    <card-item width="6" square blank>
                        <pie-chart></pie-chart>
                    </card-item>
                    <card-item width="6" blank>
                        <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Type"></custom-input>
                        <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Time"></custom-input>
                        <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Day"></custom-input>
                        <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="test"></custom-input>
                    </card-item>
                </card-item>`
    }

    square_card_item(h1, text){
        return `<card-item width="4" square>
                    <h1 style="margin:0; width:100%; float:left; position:absolute; text-align:center; height:40px; font-size:40px; margin-top:50%; top:-30px; color:var(--theme-primary-color);">${h1}</h1>
                    <p style="margin:0; width:100%; text-align:center; float:left; position:absolute; bottom:var(--global-margin);">${text}</p>
                </card-item>`
    }
}
window.customElements.define('data-view', DataView);
export{DataView};