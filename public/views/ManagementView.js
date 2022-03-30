import {View} from '/views/View.js';

class ManagementView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<custom-button division="1" icon="info" text="Add game to DB" onclick="window.history.pushState('','','/Management/AddGame')"></custom-button>`
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('management-view', ManagementView);
export{ManagementView};