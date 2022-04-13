import {Component} from '/components/Component.js';

class MenuBarBottom extends Component{
    constructor(){
        super();
    }

    connectedCallback(){ 
        window.DP.on('API_LOAD', () => {
            this.item_count = 0;
            this.classList.add('menu-bar-bottom');
        })
    }

    add_item(icon, url){
        this.item_count++;
        var button_container = document.createElement('div')
        var button = document.createElement('span')
        button_container.classList.add('header-center-button-container')
        button.classList.add('header-center-button', 'material-icons');
        button.innerText = icon;
        button_container.onclick = () => {window.history.pushState('','', url)};
        button_container.append(button);
        this.append(button_container);
        for(var i = 0; i < this.item_count; i ++){
            this.getElementsByTagName('div')[i].style.width = `calc(100% / ${this.item_count})`;
        }
    }
}

window.customElements.define('menu-bar-bottom', MenuBarBottom);
export {MenuBarBottom}
