import {Component} from '/components/Component.js';

class CustomTextInput extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.type = this.getAttribute('type');
        this.division = this.getAttribute('division')
        this.toggle = this.hasAttribute('toggle')
        this.unit;
        var colorClassList = {
            logout:'red',
            
        }

        this.classList.add('custom-text-input');
        this.setAttribute('contenteditable', 'true');
        
                        
        if(this.type == "textarea"){
            this.style.height = `${(this.getAttribute('rows') * 16) + 20}px`;
        }
        
        if(this.division != undefined){
            if(this.division >= 4){
                var p = this.getElementsByTagName('p')[0];
                var span = this.getElementsByTagName('span')[0];

                p.style['font-size'] = '15px'
                span.style.display = 'none'
                if(this.division >= 5){
                    p.style['font-size'] = '11px';
                }
            }
            this.style.width = `calc(calc(100% / ${this.division}) - var(--global-margin) - var(--global-margin) / ${this.division})` 
        }else{
            this.style.width = `calc(100% - calc(var(--global-margin) * 2))`;
        }
    
        this.addEventListener("click", () => {

        })
    }

}
window.customElements.define('custom-text-input', CustomTextInput);
export {CustomTextInput}
