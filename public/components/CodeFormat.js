import {Component} from '/components/Component.js';

class CodeFormat extends Component {
    constructor(){
        super();
    }

    connectedCallback(){
        this.text_content = String(this.innerHTML);
        console.log(this.text_content);
        this.innerText = this.text_content;
        this.classList.add('code-format')
    }
}

window.customElements.define('code-format', CodeFormat);
export{CodeFormat};

