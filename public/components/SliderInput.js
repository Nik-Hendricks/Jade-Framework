import {Component} from '/components/Component.js';

class SliderInput extends Component {
    constructor(){
         super();
    }

    connectedCallback(){
        //var main_div = document.getElementsByTagName('main-content')[0];
        //main_div.style.bottom = "120px"
        this.classList.add('slider-input')
        this.innerHTML =    `
                            <input type="range" min="1" max="100" value="50">
                            `
    }
}
window.customElements.define('slider-input', SliderInput);
export{SliderInput};