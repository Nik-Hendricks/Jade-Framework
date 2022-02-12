import {View} from '/views/View.js';

class OtherInfoView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<input id="color" type="color" value="#ff0000"/>`

       var color_picker = document.getElementById("color")

        color_picker.addEventListener("input", (e) => {
            window.VM.set_theme_property('--theme-primary-color', e.target.value)

        });

        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('other-info-view', OtherInfoView);
export{OtherInfoView};