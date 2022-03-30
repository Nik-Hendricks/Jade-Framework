import {View} from '/views/View.js';

class ManageLeaguesView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')

        
        this.innerHTML = `  <h4>Created Leagues</h4>
                            <div id="league-item-container">
                            </div>
                            <custom-button icon="add" text="Create League" onclick="window.history.pushState('','','/League/New')"></custom-button>`

        window.API2.get_managed_leagues().then(res => {
            console.log(res)
            var item_container = document.getElementById('league-item-container');
            for(var i = 0; i < res.length; i++){
                console.log(res[i])
                var el = document.createElement('list-item');
                el.setAttribute('icon', 'info');
                el.setAttribute('text', res[i].name)
                el.setAttribute('uniqid', res[i].uniqid);
                el.onclick = (ev) => {
                    var path = ev.path || (ev.composedPath && ev.composedPath());
                    var uniqid = path[1].getAttribute('uniqid')
                    window.history.pushState('','',`/League/Manage/${uniqid}`)
                }
                item_container.append(el);
            }
            window.DP.dispatch("VIEW_LOAD");
        })


        
        
        
    }
}
window.customElements.define('manage-leagues-view', ManageLeaguesView);
export{ManageLeaguesView};