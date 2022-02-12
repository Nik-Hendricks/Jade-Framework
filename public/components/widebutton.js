class WideButton extends HTMLElement{
    constructor(){
        super();
        var colorClassList = {
            logout:'red',
            
        }
        this.icon = this.getAttribute("icon");
        this.text = this.getAttribute("text");
        this.initialHTML = `<div class="wide-button">
                                <span class="material-icons ${colorClassList[this.icon]}">${this.icon}</span>
                                <p class="${colorClassList[this.icon]}">${this.text}</p> 
                            </div>`
    }

    connectedCallback(){
        this.innerHTML = this.initialHTML;
    }

}
window.customElements.define('wide-button', WideButton);
export {WideButton}
