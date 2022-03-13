import {View} from '/views/View.js';

class ManageProfileView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        var user = window.API2.get_user();
        this.innerHTML = `<img src="https://via.placeholder.com/150" style="position:relative; width:150px; border-radius: 50%; height:150px; margin-left:50%; left:-75px;"></img>
                            <trophy-chip></trophy-chip>
                            <p style="text-align:center;">${user.username}</p>
                            <custom-button variant="wide" icon="fa-solid fa-link" text="Link Accounts" onclick="window.history.pushState('','','/Profile/LinkAccounts')"></custom-button>
                            <custom-button variant="wide" icon="logout" text="Log Out" onclick="window.location='/register'"></custom-button>
                            
                            `
        window.DP.dispatch("VIEW_LOAD");
    }
}

window.customElements.define('manage-profile-view', ManageProfileView);
export{ManageProfileView};