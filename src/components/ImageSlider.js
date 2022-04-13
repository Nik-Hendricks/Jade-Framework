import {Component} from '/components/Component.js';

class ImageSlider extends Component{

    constructor(){
        super();
        this.initialHTML = `
                        <div class="images">
                        </div>
                    `
    }
    connectedCallback(){
        this.classList.add("image-slider")
        var children = this.innerHTML
        this.innerHTML = this.initialHTML;
        this.root_el = this.get_root_child()
        this.root_el.innerHTML = children;
        var images_div = this.getElementsByTagName("div")[0];
        console.log(images_div);
        //images_div.addEventListener('wheel', (evt) => {
        //    evt.preventDefault();
        //    images_div.scrollLeft += evt.deltaY;
        //});
        
    }
}

window.customElements.define('image-slider', ImageSlider);
export {ImageSlider}
