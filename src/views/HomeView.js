import {View} from '/views/View.js';

class HomeView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')      
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('home-view', HomeView);
export{HomeView};