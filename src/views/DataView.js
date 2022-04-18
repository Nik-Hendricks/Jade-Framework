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
                    this.innerHTML = /*html*/ ` ${window.Builder.square_card_item(events.length, 'Total Events')}
                                                ${window.Builder.square_card_item(day_events.length, 'Events Today')}
                                                ${window.Builder.square_card_item(remaining_events, 'Events Left')}
                                                <custom-input type="button" text="New Event" icon="event" onclick="window.history.pushState('','','/Data/Event/New')"></custom-input>
                                                <custom-input type="button" text="New Expense" icon="credit_card" onclick="window.history.pushState('','','/Data/Finances/Expenses/New')"></custom-input>
                                                <custom-input type="button" text="New Income" icon="attach_money" onclick="window.history.pushState('','','/Data/Finances/Income/New')"></custom-input>
                                                <side-scroller style="width:100%;">    
                        
                                                </side-scroller>`
                                    
                                    var sidescroller = this.getElementsByTagName('side-scroller')[0]
                                    sidescroller.root_el.innerHTML += window.Builder.big_pie_chart_card();
                                
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


}
window.customElements.define('data-view', DataView);
export{DataView};