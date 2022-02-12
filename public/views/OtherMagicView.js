import {View} from '/views/View.js';

class OtherMagicView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <color-picker></color-picker>
                            <music-player></music-player>
                            `


        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('other-magic-view', OtherMagicView);
export{OtherMagicView};