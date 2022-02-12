import {Component} from '/components/Component.js';

class CustomButton extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.variant = this.getAttribute('variant');
        var variant_classes = {
            'wide':'wide-button',
            'half':'half-button'
        }

        var colorClassList = {
            logout:'red',
            
        }

        this.icon = this.getAttribute("icon");
        this.text = this.getAttribute("text");

        this.initialHTML = `<div class="${variant_classes[this.variant]}">
                                <span class="material-icons ${colorClassList[this.icon]}">${this.icon}</span>
                                <p class="${colorClassList[this.icon]}">${this.text}</p> 
                            </div>`
        this.innerHTML = this.initialHTML;
    }

}
window.customElements.define('custom-button', CustomButton);
export {CustomButton}
