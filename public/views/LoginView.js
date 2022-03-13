import {View} from '/views/View.js';

class LoginView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = ` 
                            <div style="position:relative; margin-top:100px;">
                                <input id="username" type="text" placeholder="Username"></input>
                                <input id="password" type="password" placeholder="Password"></input>
                                <custom-button variant="wide" icon="add" text="Login"></custom-button>
                            </div>
                            <p class="secondary" onclick="window.history.pushState('','','/Register')">register</p>
                            `
        var login_button = this.getElementsByTagName('custom-button')[0]


        login_button.onclick = () => {
            var username = this.getElementsByTagName('input')[0].value;
            var password = this.getElementsByTagName('input')[1].value;
            window.API2.check_login(username, password).then(res => {
                console.log(res);
                if(res.success){
                    window.API2.setCookie('uniqid', res.success.uniqid)
                    window.location = '/Profile'
                }
            })   
        }

        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('login-view', LoginView);
export{LoginView};