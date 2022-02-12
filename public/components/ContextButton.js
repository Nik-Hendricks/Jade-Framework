import {Component} from '/components/Component.js';

class ContextButton extends Component {
    constructor(){
        super();

    }

    connectedCallback(){
        this.classList.add("context-button");
        this.innerHTML = ""
        this.items = {

        }
    }
}

window.customElements.define('context-button', ContextButton);
export{ContextButton};