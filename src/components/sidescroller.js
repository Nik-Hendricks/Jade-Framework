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

        setTimeout(() => {
            var sidescroller_content_children = this.root_el.children
            var accumulate = 0;
            for(var i = 0; i < sidescroller_content_children.length; i++){
                var el = sidescroller_content_children[i];
                accumulate += el.getBoundingClientRect().width;
                if(i == sidescroller_content_children.length -1){
                    this.getElementsByClassName('sidescroller-content')[0].style.width = `calc(${accumulate}px + calc(${sidescroller_content_children.length} * var(--global-margin)))`
                }
            }
        }, 50)

        this.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            this.scrollLeft += evt.deltaY;
        });
    }

}
window.customElements.define('side-scroller', SideScroller);
export {SideScroller}
