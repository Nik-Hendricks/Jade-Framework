import {View} from '/views/View.js';

class SettingsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =/*html*/ `  <custom-input width="6" type="color" text="Color 1"></custom-input>
                                    <custom-input width="6" type="color" text="Color 2"></custom-input>
                                    <custom-input type="button" icon="info" text="Clear DB"></custom-input>
                                    <custom-input type="button" icon="clear" text="Clear Script Cache" onclick="NCache._clear()"></custom-input>
                            `
                            

        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('settings-view', SettingsView);
export{SettingsView};