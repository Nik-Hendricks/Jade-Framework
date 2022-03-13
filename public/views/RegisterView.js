import {View} from '/views/View.js';

class RegisterView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <p>Username</p>
                            <input id="username" type="text"></input>
                            <p>Email</p>
                            <input id="email" type="text"></input>
                            <p>Password</p>
                            <input id="password" type="password"></input>

                            <p>Rules</p>
                            <card-item>
                            <ol>
                                <li>Be Respectful, Civil and Welcoming.</li>
                                <li>Sending/Linking any harmful material such as viruses, IP Grabbers or Harmware results in an immediate and permanent ban.</li>
                                <li>Usage of excessive extreme inappropriate language is prohibited.</li>
                                <li>Mentioning @everyone, the Moderators or a specific person without proper reason is prohibited.</li>
                                <li> Act civil in Voice Chats.</li>
                                <li>Post content in the correct channels.</li>
                                <li>Don't post someone's personal information without permission.</li>
                                <li>Listen to what Staff says.</li>
                                <li>Do Not misuse or spam in any of the channels.</li>
                                <li>Lastly, Happy Gaming!</li>
                            </ol>
                            </card-item>
                            <custom-button id="register" variant="wide" icon="add" text="Register"></custom-button>
                            `
        
        this.getElementsByTagName('custom-button')[0].onclick = () => {
            var username = this.getElementsByTagName('input')[0].value;
            var email = this.getElementsByTagName('input')[1].value;
            var password = this.getElementsByTagName('input')[2].value;
            window.API2.register_user(username, email, password).then(res => {
                console.log(res);
                window.API2.setCookie('uniqid', res.uniqid);
                window.location = '/Profile'
            })
        }

        window.DP.dispatch("VIEW_LOAD");
    }
}
window.customElements.define('register-view', RegisterView);
export{RegisterView};