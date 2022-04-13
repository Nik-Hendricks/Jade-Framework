import {View} from '/views/View.js';

class EventsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('events-view', EventsView);
export{EventsView};