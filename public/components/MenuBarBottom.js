import {Component} from '/components/Component.js';

class MenuBarBottom extends Component{
    constructor(){
        super();
        this.initialHTML = `<div class="menu-bar-bottom">
                            </div>`
    }

    connectedCallback(){ 
        window.DP.on('API_LOAD', () => {  
            var children = this.innerHTML
            this.innerHTML = this.initialHTML;
            this.root_el = this.get_root_child()
            this.root_el.innerHTML = children;
        })
    }
}

window.customElements.define('menu-bar-bottom', MenuBarBottom);
export {MenuBarBottom}
