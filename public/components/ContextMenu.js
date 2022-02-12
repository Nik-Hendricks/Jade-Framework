import {Component} from '/components/Component.js';

class ContextMenu extends Component {
    constructor() {
        super();
    }

    connectedCallback(){
        this.classList.add('context-menu')

    }

}

window.customElements.define('context-menu', ContextMenu);
export{ContextMenu};