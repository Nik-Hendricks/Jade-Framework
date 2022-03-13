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
        this.classList.add(variant_classes[this.variant])
        if(this.icon.includes('fa-')){
            this.initialHTML = `
                                    <i class="${this.icon} ${colorClassList[this.icon]}"></i>
                                    <p class="${colorClassList[this.icon]}">${this.text}</p> 
                                `
        }else{
            this.initialHTML = `
                                    <span class="material-icons ${colorClassList[this.icon]}">${this.icon}</span>
                                    <p class="${colorClassList[this.icon]}">${this.text}</p> 
                                `
        }


        this.innerHTML = this.initialHTML;
    }

}
window.customElements.define('custom-button', CustomButton);
export {CustomButton}
