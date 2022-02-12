import {Component} from '/components/Component.js';

class ColorPicker extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add("color-picker")
        this.innerHTML = `<div class="chip" id="button"><span class="material-icons-outlined">palette</span><p>Choose Color</p></div>
        `

        var color_picker = document.createElement("input")
        color_picker.setAttribute("type", "color")
        console.log(color_picker)

        color_picker.addEventListener("input", (e) => {
            window.VM.set_theme_property('--theme-primary-color', e.target.value)
        });

        document.getElementById("button").onclick = () => {
            color_picker.click();
        }
    }

}
window.customElements.define('color-picker', ColorPicker);
export {ColorPicker}
