import {View} from '/views/View.js';

class IncomeView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        console.log(window.location.href.split('/')[5])
        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('income-view', IncomeView);
export{IncomeView};