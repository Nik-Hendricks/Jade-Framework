import {View} from '/views/View.js';

class ProfileView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        var user = window.API2.get_user();
        this.innerHTML = `<img src="https://via.placeholder.com/150" style="position:relative; width:150px; border-radius: 50%; height:150px; margin-left:50%; left:-75px;"></img>
                            <trophy-chip></trophy-chip>
                            <p style="text-align:center;">${user.username}</p>
                            <custom-button variant="half" icon="manage" text="Manage Profile" onclick="window.history.pushState('','','/Profile/Manage')"></custom-button>
                            <custom-button variant="half" icon="chat" text="Message" onclick="window.history.pushState('','','/Profile/LinkAccounts')"></custom-button>
                            <custom-button variant="half" icon="group" text="Manage Leagues" onclick="window.history.pushState('','','/League/Manage')"></custom-button>
                            <custom-button variant="half" icon="analytics" text="Profile Stats" onclick="window.history.pushState('','','/Profile/Stats')"></custom-button>
                            <custom-button variant="wide" icon="logout" text="Log Out" onclick="window.location = '/Register'"></custom-button>`
                            
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('profile-view', ProfileView);
export{ProfileView};