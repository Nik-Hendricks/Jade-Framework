import {Component} from '/components/Component.js';

class MenuBarTop extends Component{
    static get observedAttributes() { return ['title']; }
    constructor(){
        super();
        this.title = this.getAttribute('title')
    }

    connectedCallback(){
        this.classList.add('menu-bar-top');
        this.update();
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if(attr == 'title'){
            this.update();
        }
    }

    update(){
        this.innerHTML = `  <span class="material-icons-outlined back" onclick="window.history.back()">
                                        arrow_back_ios
                                    </span>
                                    <h1>${this.title}</h1>
                                    <span class="material-icons-outlined search">
                                        search
                                    </span>`;

        this.getElementsByClassName('back')[0].onclick = () => {
            window.history.back();
        }

        this.getElementsByClassName('search')[0].onclick = () => {
            this.search_content();
            this.resizeComponents(true);
        }
    }

    search_content(){
        this.innerHTML = `  <custom-input blank width="2" type="button" icon="arrow_back_ios" text="" style="margin-top:12.5px;"></custom-input>
                            <custom-input blank width="10" type="text" placeholder="Search anything..." style="margin-top:12.5px;"></custom-input>
                            <card-item width="12" blank></card-item>
                            `;


        this.back_button = this.getElementsByTagName('custom-input')[0];
        this.search_textbox = this.getElementsByTagName('custom-input')[1];
        this.search_results_container = this.getElementsByTagName('card-item')[0];
        this.search_textbox.focus();
        this.search_textbox.onkeydown = (ev) => {
            window.API2.global_search(this.search_textbox.textContent, ['events']).then(res => {
                if(res.length > 0){
                    this.show_search_result(res)
                }else{
                    this.hide_search_result();
                }
            });
        }

        this.back_button.onclick = () => {
            this.update();
        }
    }

    append_search_results(res){
        this.search_results_container.innerHTML = '';
        res.forEach(item => {
            this.search_results_container.innerHTML += this.search_result(item);
        })
    }

    search_result(item){
        return `    <div onclick="window.history.pushState('','','/Data/Event/Edit/${item._id}')">
                        <card-item width="2" style="height:40px; background-color:var(--theme-secondary-color);">
                            <span class="material-icons" style="width:100%; margin-top:0px; height:100%; text-align:center; font-size:18px; color:white;">article</span>
                        </card-item>
                        <card-item width="10" style="background-color:var(--theme-background-color); height:40px;">
                            <p style="padding:0; margin:0; margin-top:0px; text-align:center;">${item.name}</p>
                        </card-item>
                    </div>`
    }

    show_search_result(res){
        this.search_results_container.removeAttribute('blank')
        this.append_search_results(res);
        this.search_results_container.style['z-index'] = 99;
        this.search_results_container.style['box-shadow'] = '5px 5px 5px var(--theme-background-color)'
        this.search_results_container.style.backgroundColor = 'var(--theme-card-color)'
        this.resizeComponents(true);
    }
    
    hide_search_result(){
        this.search_results_container.innerHTML = ''
        this.search_results_container.setAttribute('blank','true');
        this.search_results_container.style['z-index'] = -1;
        this.search_results_container.style.backgroundColor = 'transparent'
    }

}

window.customElements.define('menu-bar-top', MenuBarTop);
export {MenuBarTop}
