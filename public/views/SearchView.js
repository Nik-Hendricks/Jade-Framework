import {View} from '/views/View.js';

class SearchView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <input type="text" placeholder="search"></input>
                            <side-scroller>
                            </side-scroller>
                            </br>
                            </br>`

        this.filterable_databases = ['users', 'posts', 'leagues','games'];
        this.search_text_box = this.getElementsByTagName('input')[0];
        this.filter_databases = [];
        this.filter_sidescroller = this.getElementsByTagName('side-scroller')[0];
        for(var i = 0; i < this.filterable_databases.length; i++){
            var el = document.createElement('custom-button');
            el.setAttribute('division', 4)
            el.setAttribute('icon', null)
            el.setAttribute('toggle', true)
            el.setAttribute('text', this.filterable_databases[i]);
            el.onclick = (e) => {
                var text = e.target.innerText.toLowerCase().replace(/(\r\n|\n|\r)/gm, "");
                this.filter_databases = window.API2.toggle_array(this.filter_databases, text);
            }
            this.filter_sidescroller.append(el)
        }

        this.search_text_box.onkeydown = (ev) => {
            if(ev.key == 'Enter'){
                window.API2.global_search(this.search_text_box.value, this.filter_databases).then(res => {
                    for(var i = 0; i < res.length; i++){
                        var el;
                        var obj = res[i];
                        var data_type = obj.data_type;
                        var text;
                        var url;
                        if(data_type == 'user'){
                            el = document.createElement('list-item');
                            url = `/Profile/${obj.public_uniqid}`
                            el.setAttribute('icon', 'info')
                            el.setAttribute('text', obj.username)
                        }else if(data_type == 'post'){
                            el = document.createElement('post-card');
                            url = `/Posts/${obj.uniqid}`
                            el.setAttribute('title', obj.title)
                            el.setAttribute('content', obj.content)
                            el.setAttribute('author_public_uniqid', obj.author_public_uniqid);
                        }else if(data_type == 'league'){
                            el = document.createElement('list-item');
                            text = obj.name;
                            el.setAttribute('icon', 'info')
                            el.setAttribute('text', text)
                        }else{
                            el = document.createElement('list-item');
                            text = 'game'
                            el.setAttribute('icon', 'info')
                            el.setAttribute('text', text)
                        }

                        el.onclick = () => {window.history.pushState('','',url)}
                        this.append(el)
                    }
                });
            }
        }


        window.DP.dispatch("VIEW_LOAD");
        
    }
}
window.customElements.define('search-view', SearchView);
export{SearchView};