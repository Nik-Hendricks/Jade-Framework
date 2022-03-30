import {Component} from '/components/Component.js';

class PostCardFooter extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('post-card-footer')
        this.likes = this.getAttribute('likes');
        this.comments = this.getAttribute('comments');
        this.innerHTML =`   <custom-button division="2" rel="true" icon="chat" text="Comments"></custom-button>
                            <custom-button division="2" rel="true" icon="thumb_up" text="Like"></custom-button>`

        this.comment_button = this.getElementsByTagName('custom-button')[0]
        this.like_button = this.getElementsByTagName('custom-button')[1]
    }
}
window.customElements.define('post-card-footer', PostCardFooter);
export{PostCardFooter}