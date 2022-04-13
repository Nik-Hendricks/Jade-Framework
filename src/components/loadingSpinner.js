class LoadingSpinner extends HTMLElement{
    constructor(){
        super();
        this.initialHTML = `<div id="loading"></div>`
    }

    connectedCallback(){
        this.classList.add("loading-spinner")
        window.loadingSpinner = this;
        this.innerHTML = this.initialHTML;
    }

    hide(){
        this.innerHTML = ''
    }

    show(){
        this.innerHTML = this.initialHTML;
    }
}
window.customElements.define('loading-spinner', LoadingSpinner);
export {LoadingSpinner}
