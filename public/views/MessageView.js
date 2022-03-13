import {View} from '/views/View.js';

class MessageView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = ``;
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('message-view', MessageView);
export{MessageView};