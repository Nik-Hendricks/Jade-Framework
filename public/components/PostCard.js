import {Component} from '/components/Component.js';

class PostCard extends Component {
    static get observedAttributes() { return ['title', 'primary']; }
    constructor(callback){
        super();
        if(callback){
            callback(this)
        }

    }

    connectedCallback(){
        this.classList.add("post-card");
        this.s_id = this.getAttribute('s_id');
        this.update();
    }

    update(){
        var html = `
                    <image-slider>
                    </image-slider>
                    <p class="primary">${this.getAttribute('title')}</p>
                    <p class="secondary brand-primary-color">${this.getAttribute('primary')}</p>
                    <p class="card-description">${this.getAttribute('description')}</p>
                    `
        this.innerHTML = html;
        //this.appendImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadDHI6Z6VN4Ckiw9XaB6pKim7Seio2VfOEw&usqp=CAU')
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr)
        this.update();
        
    }

    appendImage(url){
        this.getElementsByTagName('image-slider')[0].root_el.innerHTML += `<img src="${url}"/>`
    }
}

window.customElements.define('post-card', PostCard);
export{PostCard}
