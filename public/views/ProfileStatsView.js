import {View} from '/views/View.js';

class ProfileStatsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
    
        this.innerHTML = ``

        window.DP.dispatch("VIEW_LOAD");
        
        
    }
}
window.customElements.define('profile-stats-view', ProfileStatsView);
export{ProfileStatsView};