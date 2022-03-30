import {Component} from '/components/Component.js';

class CustomButton extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.icon = this.getAttribute("icon");
        this.text = this.getAttribute("text");
        this.division = this.getAttribute('division')
        this.toggle = this.hasAttribute('toggle')
        this.unit;
        var colorClassList = {
            logout:'red',
            
        }

        this.classList.add('custom-button')
        if(this.icon.includes('fa-')){
            this.innerHTML = `
                                    <i class="${this.icon} ${colorClassList[this.icon]}"></i>
                                    <p class="${colorClassList[this.icon]}">${this.text}</p> 
                                `
        }else{
            this.innerHTML = `
                                    <span class="material-icons ${colorClassList[this.icon]}">${this.icon}</span>
                                    <p class="${colorClassList[this.icon]}">${this.text}</p> 
                                `
        }

        if(this.division != undefined){
            if(this.division >= 4){
                var p = this.getElementsByTagName('p')[0];
                var span = this.getElementsByTagName('span')[0]

                p.style['font-size'] = '15px'
                span.style.display = 'none'
                if(this.division >= 5){
                    p.style['font-size'] = '11px'
                }
            }
            this.style.width = `calc(calc(100% / ${this.division}) - var(--global-margin) - var(--global-margin) / ${this.division})` 
        }else{
            this.style.width = `calc(100% - calc(var(--global-margin) * 2))`;
        }
     


        this.addEventListener("click", () => {
            this.classList.toggle('clicked-animation')
            if(!this.toggle){
                setTimeout(() => {
                    this.classList.toggle('clicked-animation')
                }, 200)
            }
        })


        



        

    }

}
window.customElements.define('custom-button', CustomButton);
export {CustomButton}
