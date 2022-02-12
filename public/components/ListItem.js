import {Component} from '/components/Component.js';

class ListItem extends Component {
    constructor(){
        super();
        this.classList.add('list-item');
        this.icon = this.getAttribute('icon');
        this.text = this.getAttribute('text')
    }

    connectedCallback(){
        var children = this.innerHTML
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()
        this.root_el.innerHTML = `<span class="material-icons-outlined">
                                    ${this.icon}
                                    </span>
                                    <p>${this.text}</p>
                                    <span class="right material-icons-outlined">navigate_next</span>`;
    }
}

window.customElements.define('list-item', ListItem);
export{ListItem};