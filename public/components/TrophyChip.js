import {Component} from '/components/Component.js';

class TrophyChip extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add("trophy-chip")
        this.innerHTML = `  <div class="mini-trophy-item">
                                <span class="material-icons">emoji_events</span>
                                <p>43</p>
                            </div>
                             <div class="mini-trophy-item">
                                <span class="material-icons">military_tech</span>
                                <p>69</p>
                            </div>
                            <div class="mini-trophy-item">
                                <span class="material-icons">groups</span>
                                <p>2.5k</p>
                            </div>
                            `
    }
}
window.customElements.define('trophy-chip', TrophyChip);
export {TrophyChip}
