import {View} from '/views/View.js';

class ManageLeagueMembersView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.league_uniqid = window.location.href.split('/')[5]
        window.API2.get_league_applicants(this.league_uniqid).then(applicants => {
            this.innerHTML += `<list-item icon="info" text="test"></list-item>`
        })
        this.innerHTML = ``
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('manage-league-members-view', ManageLeagueMembersView);
export{ManageLeagueMembersView};