import {View} from '/views/View.js';

class ManageProfileView extends View{
    constructor(){
        super();
    }

    async connectedCallback(){
        this.classList.add('view')
        var user = await window.API2.user();
        this.innerHTML = `  <img src="https://via.placeholder.com/150" style="position:relative; width:150px; border-radius: 50%; height:150px; margin-left:50%; left:-75px;"></img>
                            <trophy-chip></trophy-chip>
                            <p style="text-align:center;">${user.username}</p>
                            <custom-button division="2" icon="manage" text="Linked Accounts" onclick="window.history.pushState('','','/Profile/Manage/LinkAccounts')"></custom-button>
                            <custom-button division="2" icon="chat" text="Subscribers" onclick="window.history.pushState('','','/Profile/Subscribers')"></custom-button>
                            <custom-button division="2" icon="group" text="Leagues" onclick="window.history.pushState('','','/League/Manage')"></custom-button>
                            <custom-button division="2" icon="analytics" text="Stats" onclick="window.history.pushState('','','/Profile/Stats')"></custom-button>
                            <custom-button icon="logout" text="Log Out" onclick="window.location = '/Register'"></custom-button>`
                            
        window.DP.dispatch("VIEW_LOAD");
    }
}

window.customElements.define('manage-profile-view', ManageProfileView);
export{ManageProfileView};