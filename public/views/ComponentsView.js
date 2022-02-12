import {View} from '/views/View.js';

class ComponentsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = ` <p><code-format><card-item></code-format> component</p>
                            <card-item variant="1">
                                
                            </card-item>
                            <hr>
                            <p><code-format><side-scroller></code-format> component</p>   
                            <side-scroller>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                            </side-scroller>
                            <hr>
                            <p><code-format><post-card></code-format> component</p>
                            <post-card id="post-card" title="Post Card", primary="test", description="this is a description">
                            </post-card>
                            <hr>
                            <p><code-format><list-item></code-format> component</p>
                            <list-item text="Test list item" icon="info"></list-item>
                            <hr>

                            <p><code-format><grid-container></code-format> component</p>

                            <grid-container>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                                <card-item variant="2" title="Test Item" secondary="secondary" image="https://via.placeholder.com/300"></card-item>
                            </grid-container>

                            <hr>

                            <p><code-format><wide-button></code-format> component</p>
                            <wide-button text="Wide Button" icon="info"></wide-button>

                            <hr>
                            
                            <p><code-format><color-picker></code-format> component</p>
                            <color-picker></color-picker>

                            <hr>

                            <p><code-format><custom-calculator></code-format> component</p>
                            <custom-calculator></custom-calculator>

                            <hr>

                            <p><code-format><custom-calendar></code-format> component</p>
                            <custom-calendar></custom-calendar>

                            `

        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")
        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")
        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")
        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")
        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")
        document.getElementById('post-card').appendImage("https://via.placeholder.com/300")


        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('components-view', ComponentsView);
export{ComponentsView};