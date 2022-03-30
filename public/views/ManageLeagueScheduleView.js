import {View} from '/views/View.js';

class ManageLeagueScheduleView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.league_uniqid = window.location.href.split('/')[5]
        this.innerHTML = `  <custom-calendar>
                            </custom-calendar>
                            <drop-down-button icon="info" text="Start Date"></drop-down-button>`
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('manage-league-schedule-view', ManageLeagueScheduleView);
export{ManageLeagueScheduleView};