import {View} from '/views/View.js';

class PostView extends View{
    constructor(){
        super();
    }

    async connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <input type="text" placeholder="Title"></input>
                            <textarea type="text" placeholder="Say something cool" rows="15"></textarea>
                            <custom-button icon="add" text="Post"></custom-button>`

                            this.getElementsByTagName('custom-button')[0].onclick = () => {
                                var title = this.getElementsByTagName('input')[0].value;
                                var content = this.getElementsByTagName('textarea')[0].value;
                                window.API2.create_post(title, content).then(res => {
                                    console.log(res);
                                })
                            }
        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('post-view', PostView);
export{PostView};