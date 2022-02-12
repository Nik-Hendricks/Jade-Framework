import {Component} from '/components/Component.js';

class SideScroller extends Component{
    constructor(){
        super();
        this.classList.add("sidescroller")
        this.initialHTML = `
                            <div class="sidescroller-content">
                            </div>
                            `
    }

    connectedCallback(){
        var children = this.innerHTML
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()
        this.root_el.innerHTML = children;
        this.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            this.scrollLeft += evt.deltaY;
        });
    }

}
window.customElements.define('side-scroller', SideScroller);
export {SideScroller}
