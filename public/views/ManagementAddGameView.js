import {View} from '/views/View.js';

class ManagementAddGameView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <custom-text-input division="1" placeholder="Name" type="text"></custom-text-input>
                            <custom-text-input division="1" placeholder="Description" type="textarea" rows="6"></custom-text-input>
                            <custom-text-input division="1" placeholder="URL" type="text"></custom-text-input>
                            <custom-button icon="save" text="Save"></custom-button>`
    

        
        this.save_button = this.getElementsByTagName('custom-button')[0];

        this.save_button.onclick = () => {
            this.name_textbox = this.getElementsByTagName('custom-text-input')[0];
            this.description_textbox = this.getElementsByTagName('custom-text-input')[1];
            this.url_textbox = this.getElementsByTagName('custom-text-input')[2];
            window.API2.create_game(this.name_textbox.textContent, this.description_textbox.textContent, this.url_textbox.textContent).then(res => {
                console.log(res);
                this.name_textbox.textContent = ''
                this.description_textbox.textContent = '';
                this.url_textbox.textContent = '';
                this.name_textbox.focus();
            })
        }

        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('management-add-game-view', ManagementAddGameView);
export{ManagementAddGameView};