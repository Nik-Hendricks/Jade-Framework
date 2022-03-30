import {Component} from '/components/Component.js';

class PostCardHeader extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('post-card-header')
        this.username = this.getAttribute('username');
        this.image_url = this.getAttribute('image_url')
        this.innerHTML =`   
                            <img src="${this.image_url}"></img>
                            <p class="username">${this.username}</p>
                            <trophy-chip></trophy-chip>
                            `
    }
}
window.customElements.define('post-card-header', PostCardHeader);
export{PostCardHeader}