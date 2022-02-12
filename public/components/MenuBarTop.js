import {Component} from '/components/Component.js';

class MenuBarTop extends Component{
    static get observedAttributes() { return ['title']; }
    constructor(){
        super();
        this.title = this.getAttribute('title')
        

    }

    connectedCallback(){
  
        this.classList.add('menu-bar-top');
        var children = this.innerHTML
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()
        this.update();
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr)
        if(attr == 'title'){
            this.update();
        }
    }

    update(){
        this.root_el.innerHTML = `  <span id="back" class="material-icons-outlined">
                                        arrow_back_ios
                                    </span>
                                    <h1>${this.title}</h1>`;

        document.getElementById("back").onclick = () => {
            window.history.back();
        }

    }
}

window.customElements.define('menu-bar-top', MenuBarTop);
export {MenuBarTop}
