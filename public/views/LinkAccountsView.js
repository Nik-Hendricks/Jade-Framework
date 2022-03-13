import {View} from '/views/View.js';

class LinkAccountsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
    
        this.innerHTML = `  <custom-button variant="wide" icon="fa-brands fa-discord" text="Discord"></custom-button>
                            <custom-button variant="wide" icon="fa-brands fa-twitch" text="Twitch"></custom-button>
                            <custom-button variant="wide" icon="fa-brands fa-steam" text="Steam"></custom-button>`

        window.DP.dispatch("VIEW_LOAD");
        
        
    }
}
window.customElements.define('link-accounts-view', LinkAccountsView);
export{LinkAccountsView};