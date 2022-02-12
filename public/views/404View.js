class NotFoundView extends HTMLElement{
    constructor(){
        super();
        this.phrases = [''];
    }

    connectedCallback(){
        this.classList.add("view", "dank-404-view")
        this.innerHTML =
                        `<h1>404</h1>
                        <p>Page not found</p>`;

                        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('dank-404-view', NotFoundView);
export{NotFoundView}