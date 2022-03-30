import {Component} from '/components/Component.js';

class PostCard extends Component {
    static get observedAttributes() { return ['content', 'primary']; }
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add("post-card");
        this.type = this.getAttribute('type');
        this.content = `<h1>${this.getAttribute('content')}</h1>`;
        this.author_public_uniqid = this.getAttribute('author_public_uniqid');
        this.attachments = [];
        this.update();
    }

    update(){
        window.API2.get_user(this.author_public_uniqid).then(user => {
            this.post_html = `  <post-card-header username="${user.username}" image_url="https://via.placeholder.com/150"></post-card-header>
                                <textarea rows="11" placeholder="Comment"></textarea>
                                <custom-button icon="add" text="Post" style="float:unset; bottom:10px;"></custom-button>`


            if(this.type == "post"){
                this._HTML = this.post_html
            }else{
                this._HTML = `  <post-card-header username="${user.username}" image_url="https://via.placeholder.com/150"></post-card-header>
                                    ${this.content}
                                <post-card-footer likes="" comments=""></post-card-footer>`
            }
            this.innerHTML = this._HTML;
            
            this.post_card_header = this.getElementsByTagName('post-card-header')[0];
            this.post_card_footer = this.getElementsByTagName('post-card-footer')[0];
            
            this.post_card_footer.like_button.onclick = () => {
                
            }

            this.post_card_footer.comment_button.onclick = () => {
                this.innerHTML =  this.post_html;
            }

        })

    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr)
        this.update();
        
    }


}

window.customElements.define('post-card', PostCard);
export{PostCard}
