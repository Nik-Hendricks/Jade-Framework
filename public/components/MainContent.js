class MainContent extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = ``;
    }
}
window.customElements.define('main-content', MainContent);
export{MainContent};