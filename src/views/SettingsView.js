import {View} from '/views/View.js';

class SettingsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =/*html*/ ` 
                                    <custom-input type="button" icon="info" text="Clear DB"></custom-input>
                                    <custom-input type="button" icon="clear" text="Clear Script Cache" onclick="NCache._clear()"></custom-input>
                                    <custom-input type="color" width="6" text="Primary Color"></custom-input>
                                    <custom-input type="color" width="6" text="Secondary Color"></custom-input>
                                    <custom-input type="button" icon="light_mode" text="Light Theme"></custom-input>
                                    <custom-input type="button" icon="dark_mode" text="Dark Theme"></custom-input>
                                    <custom-input type="slider" width="4" min="0" max="50" ></custom-input>
                                    <custom-input type="slider" width="4" min="0" max="50" ></custom-input>
                                    <custom-input type="slider" width="4" min="0" max="50" ></custom-input>
                                    <card-item width="4" blank><p style="margin:0; margin-bottom:10px; width:100%; text-align:center;">Global Margin</p></card-item>
                                    <card-item width="4" blank><p style="margin:0; margin-bottom:10px; width:100%; text-align:center;">Global Padding</p></card-item>
                                    <card-item width="4" blank><p style="margin:0; margin-bottom:10px; width:100%; text-align:center;">Border Radius</p></card-item>
                                    <card-item><p style="width:100%; text-align:center; margin:0; margin-bottom:10px;">App Version: <b style="color:var(--theme-primary-color);">${window.localStorage.getItem('_update_version')}</b></p></card-item>`

        this.light_theme_button = this.getElementsByTagName('custom-input')[4];
        this.dark_theme_button = this.getElementsByTagName('custom-input')[5];
        this.margin_slider = this.getElementsByTagName('custom-input')[6];
        this.padding_slider = this.getElementsByTagName('custom-input')[7];
        this.border_radius_slider = this.getElementsByTagName('custom-input')[8];
        this.primary_color_picker = this.getElementsByTagName('custom-input')[2];
        this.secondary_color_picker = this.getElementsByTagName('custom-input')[3];
        var current_global_margin = getComputedStyle(this).getPropertyValue('--global-margin');
        var current_global_padding = getComputedStyle(this).getPropertyValue('--global-padding');
        var current_border_radius = getComputedStyle(this).getPropertyValue('--global-border-radius')


        //set values of slider value indicator cards
        this.getElementsByTagName('card-item')[0].getElementsByTagName('p')[0].innerHTML = `Global Margin ${current_global_margin}`
        this.getElementsByTagName('card-item')[1].getElementsByTagName('p')[0].innerHTML = `Global Padding ${current_global_padding}`
        this.getElementsByTagName('card-item')[2].getElementsByTagName('p')[0].innerHTML = `Border Radius ${current_border_radius}`
        //set values of slider inputs
        this.margin_slider.getElementsByTagName('input')[0].value = current_global_margin.split('px')[0];
        this.padding_slider.getElementsByTagName('input')[0].value = current_global_padding.split('px')[0];
        this.border_radius_slider.getElementsByTagName('input')[0].value = current_border_radius.split('px')[0];

        this.light_theme_button.onclick = () => {
            window.VM.set_theme_property('--theme-card-color', '#b3b8bd')
            window.VM.set_theme_property('--theme-background-color', 'white')
            window.VM.set_theme_property('--theme-text-primary-color', '#1f2122')
            window.VM.set_theme_property('--theme-text-secondary-color', '#1f2122')
        }

        this.dark_theme_button.onclick = () => {
            window.VM.set_theme_property('--theme-card-color', '#1f2122')
            window.VM.set_theme_property('--theme-background-color', '#131414')
            window.VM.set_theme_property('--theme-text-primary-color', '#E4E6EB')
            window.VM.set_theme_property('--theme-text-secondary-color', '#B0B3B8')
        }

        this.margin_slider._on_change((e) => {
            console.log(e)
            window.VM.set_theme_property('--global-margin', e +'px')
            this.getElementsByTagName('card-item')[0].getElementsByTagName('p')[0].innerHTML = `Global Margin ${e}px`
            window.VM.resize_components();
        })

        this.padding_slider._on_change((e) => {
            console.log(e)
            window.VM.set_theme_property('--global-padding', e +'px')
            this.getElementsByTagName('card-item')[1].getElementsByTagName('p')[0].innerHTML = `Global Padding ${e}px`
            window.VM.resize_components();
        })

        this.border_radius_slider._on_change((e) => {
            this.getElementsByTagName('card-item')[2].getElementsByTagName('p')[0].innerHTML = `Border Radius ${e}px`
            window.VM.set_theme_property('--global-border-radius', e +'px')
        })

        this.primary_color_picker._on_change(e => {
            window.VM.set_theme_property('--theme-primary-color', e)
        })

        this.secondary_color_picker._on_change(e => {
            window.VM.set_theme_property('--theme-secondary-color', e)
        })

        window.DP.dispatch("VIEW_LOAD");
    }

}
window.customElements.define('settings-view', SettingsView);
export{SettingsView};