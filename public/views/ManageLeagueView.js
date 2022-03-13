import {View} from '/views/View.js';

class ManageLeagueView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.league_uniqid = window.location.href.split('/')[5]
        window.API2.get_league(this.league_uniqid).then(league => {
            window.VM.set_title(league.name)
            this.innerHTML = `  <custom-calendar></custom-calendar>
                                <custom-button variant="half" text="View Applicants" icon="emoji_people" onclick="window.history.pushState('','','/League/Manage/${this.league_uniqid}/Applicants')"></custom-button>
                                <custom-button variant="half" text="Create Post" icon="post_add"></custom-button>`

            var calendar = this.getElementsByTagName('custom-calendar')[0]
            calendar.cal_data['mar'][league.premier_date] = {color: 'blue'}
            window.DP.dispatch('VIEW_LOAD')
        })
    }
}
window.customElements.define('manage-league-view', ManageLeagueView);
export{ManageLeagueView};