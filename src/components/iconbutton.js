class IconButton extends HTMLElement{
    constructor(){
        super();
        this.icon = this.getAttribute('icon')
        this.button_color_classes = {
            delete:'red'
        }
    }

    connectedCallback(){
        this.innerHTML = `<span class="material-icons icon-button ${this.button_color_classes[this.icon]}">
                                ${this.icon}
                            </span>`
    }
}

window.customElements.define('icon-button', IconButton);

export{IconButton};