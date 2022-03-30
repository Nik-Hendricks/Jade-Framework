import {View} from '/views/View.js';

class ProfileView extends View{
    constructor(){
        super();
    }

    async connectedCallback(){
        this.classList.add('view')
        var user_public_uniqid = window.location.href.split('/')[4]
        if(user_public_uniqid != undefined){
            this.user = await window.API2.get_user(user_public_uniqid);
            this.me = false;
            this.control_slot =  `<custom-button  icon="group_add" text="Subscribe" onclick="window.API2.subscribe('${user_public_uniqid}', '${window.API2.getCookie('uniqid')}')"></custom-button>`
        }else{ 
            this.user = window.API2.user();
            this.me = true;
            this.control_slot =  `  <custom-button division="2" icon="manage_accounts" text="Manage" onclick="window.history.pushState('','','/Profile/Manage')"></custom-button>
                                    <custom-button division="2" icon="add" text="Post" onclick="window.history.pushState('','','/Post')"></custom-button>
                                    `
        }

        this.innerHTML = `  <img src="https://via.placeholder.com/150" style="position:relative; width:150px; border-radius: 50%; height:150px; margin-left:50%; left:-75px;"></img>
                            <trophy-chip></trophy-chip>
                            <p style="text-align:center;">${this.user.username}</p>
                            <div id="control-slot-1">
                            </div>
                            `     
                            
        var control_slot_1 = document.getElementById('control-slot-1')
        control_slot_1.innerHTML = this.control_slot;

        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('profile-view', ProfileView);
export{ProfileView};