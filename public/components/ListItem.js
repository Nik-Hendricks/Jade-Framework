import {Component} from '/components/Component.js';

class ListItem extends Component {
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('list-item');
        this.icon = this.getAttribute('icon');
        this.text = this.getAttribute('text')




        if(this.icon.includes('fa-')){
            this.initialHTML = `
                                    <i class="${this.icon} "></i>
                                    <p class="right">${this.text}</p> 
                                    <span class="right material-icons-outlined">navigate_next</span>
                                `
        }else{
            this.initialHTML = `
                                    <span class="material-icons">${this.icon}</span>
                                    <p class="right">${this.text}</p> 
                                    <span class="right material-icons-outlined">navigate_next</span>
                                `
        }
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()



        
    }
}

window.customElements.define('list-item', ListItem);
export{ListItem};