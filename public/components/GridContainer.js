import {Component} from '/components/Component.js';

class GridContainer extends Component {


    connectedCallback(){
        this.classList.add('grid-container');
        var children = this.innerHTML;
        this.innerHTML = ``;
        this.root_el = this.get_root_child();
        this.root_el.innerHTML = children;
    }
}

window.customElements.define('grid-container', GridContainer);
export{GridContainer};