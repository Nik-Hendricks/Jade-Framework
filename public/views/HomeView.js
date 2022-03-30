import {View} from '/views/View.js';

class HomeView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <input type="text" placeholder="search"></input>
                            </br>
                            </br>`
        var search_text_box = this.getElementsByTagName('input')[0]
        search_text_box.onkeydown = (ev) => {
            if(ev.key == 'Enter'){
                window.API2.global_search(search_text_box.value).then(res => {
                    console.log(res)
                    for(var i = 0; i < res.length; i++){
                        var el;
                        var obj = res[i];
                        var data_type = obj.data_type;
                        var text;
                        var url;
                        if(data_type == 'user'){
                            el = document.createElement('list-item');
                            text = obj.username;
                            url = `/Profile/${obj.public_uniqid}`
                        }else if(data_type == 'post'){
                            el = document.createElement('post-card');
                            text = obj.title;
                            url = `/Posts/${obj.uniqid}`
                        }else if(data_type == 'league'){
                            el = document.createElement('list-item');
                            text = obj.name;
                        }else{
                            el = document.createElement('list-item');
                            text = 'game'
                        }
                        el.setAttribute('icon', 'info')
                        el.setAttribute('text', text)
                        el.onclick = () => {window.history.pushState('','',url)}
                        this.append(el)
                    }
                });
            }
        }

        window.API2.get_post_feed().then(feed => {
            for(var i = 0; i < feed.length; i++){
                var el = document.createElement('post-card')
                el.setAttribute('title', feed[i].title);
                el.setAttribute('content', feed[i].content);
                this.append(el);
                if(i == feed.length -1){
                    window.DP.dispatch("VIEW_LOAD");
                }
            }
        })

        
    }
}
window.customElements.define('home-view', HomeView);
export{HomeView};