import {View} from '/views/View.js';

class ExpenseView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('expenses-view', ExpenseView);
export{ExpenseView};