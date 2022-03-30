import {View} from '/views/View.js';

class SubscribersView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view');
        window.API2.get_subscribers().then(res => {
            
        })
        this.innerHTML =``
        window.DP.dispatch("VIEW_LOAD")
    }
}
window.customElements.define('subscribers-view', SubscribersView);
export{SubscribersView};