import {Component} from '/components/Component.js'

class Card extends Component{
    static get observedAttributes() { return ['variant']; }
    constructor(){
        super();
    };

    connectedCallback(){
        this.clasify();
        if(this.getAttribute('image')){
            this.innerHTML += `<img src="${this.getAttribute('image')}"/>`
        }
        if(this.getAttribute('title')){
            this.innerHTML += `<p>${this.getAttribute('title')}</p>`
        }
        if(this.getAttribute('secondary')){
            this.innerHTML += `<p class="secondary">${this.getAttribute('secondary')}`
        }
    }

    clasify(){
        this.classes = ['card', 'card-2'];
        if(this.getAttribute("variant")){
            this.variant_class = this.classes[Number(this.getAttribute("variant")) -1]
        }else{
            this.variant_class = this.classes[0];
        }

        this.classList.add(this.variant_class);

  

        var children = this.innerHTML;
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()
        this.root_el.innerHTML = children;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if(attr == 'variant'){
            this.clasify();
        }
    }

}
window.customElements.define('card-item', Card);
export {Card}
