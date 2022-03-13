import {View} from '/views/View.js';

class HomeView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<list-item text="Goto Register" onclick="window.history.pushState('','','/Register')"></list-item>`
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('home-view', HomeView);
export{HomeView};