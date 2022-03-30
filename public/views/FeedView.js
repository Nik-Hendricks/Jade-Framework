import {View} from '/views/View.js';

class FeedView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML += `<post-card type="post"></post-card>`
        window.API2.get_post_feed().then(feed => {
            for(var i = 0; i < feed.length; i++){
                var el = document.createElement('post-card')
                el.setAttribute('title', feed[i].title);
                el.setAttribute('content', feed[i].content);
                el.setAttribute('author_public_uniqid', feed[i].author_public_uniqid)
                this.append(el);
                if(i == feed.length -1){
                    window.DP.dispatch("VIEW_LOAD");
                }
            }
        })

        
    }
}
window.customElements.define('feed-view', FeedView);
export{FeedView};