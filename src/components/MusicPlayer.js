import {View} from '/views/View.js';

class MusicPlayer extends View{
    constructor(){
         super();
    }

    connectedCallback(){
        //var main_div = document.getElementsByTagName('main-content')[0];
        //main_div.style.bottom = "120px"
        this.classList.add('music-player')
        this.innerHTML =    `
                            <span class="material-icons">
                                skip_previous
                            </span>
                            <span class="material-icons">
                                play_arrow
                            </span>
                            <span class="material-icons">
                                fast_forward
                            </span>
                            <slider-input></slider-input>
                            `
    }
}
window.customElements.define('music-player', MusicPlayer);
export{MusicPlayer};