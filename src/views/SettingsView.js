import {View} from '/views/View.js';

class SettingsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =/*html*/ ` 
                                    <custom-input type="button" icon="info" text="Clear DB"></custom-input>
                                    <custom-input type="button" icon="clear" text="Clear Script Cache" onclick="NCache._clear()"></custom-input>
                                    <card-item><p style="width:100%; text-align:center; margin:0; margin-bottom:10px;">App Version: <b style="color:var(--theme-primary-color);">${window.localStorage.getItem('_update_version')}</b></p></card-item>
                            `
                            

        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('settings-view', SettingsView);
export{SettingsView};