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
                                <custom-button division="2" text="Members" icon="emoji_people" onclick="window.history.pushState('','','/League/Manage/${this.league_uniqid}/Members')"></custom-button>
                                <custom-button division="2" text="Post" icon="post_add"></custom-button>
                                <custom-button division="2" text="Statistics" icon="trending_up"></custom-button>
                                <custom-button division="2" text="Edit" icon="edit"></custom-button>
                                <custom-button division="2" text="Schedule" icon="edit" onclick="window.history.pushState('','','/League/Manage/${this.league_uniqid}/Schedule')"></custom-button>`
                    

            var calendar = this.getElementsByTagName('custom-calendar')[0]
            calendar.cal_data['mar'][league.premier_date] = {color: 'blue'};
            calendar.open_calendar()

            calendar.on_date_clicked(date => {
                console.log(date)

            })
            window.DP.dispatch('VIEW_LOAD')
        })
    }
}
window.customElements.define('manage-league-view', ManageLeagueView);
export{ManageLeagueView};