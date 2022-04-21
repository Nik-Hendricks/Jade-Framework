import {View} from '/views/View.js';

class AutomationView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<custom-input type="button" icon="add" text="New Automation"></custom-input>`
        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('automation-view', AutomationView);
export{AutomationView};