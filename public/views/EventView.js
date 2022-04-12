import {View} from '/views/View.js';

class EventView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        console.log(window.location.href.split('/')[5])
        window.API2.get_event(window.location.href.split('/')[5]).then(event => {
            console.log(event);
            this.innerHTML += ``
        })
        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('event-view', EventView);
export{EventView};