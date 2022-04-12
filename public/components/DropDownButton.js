class DropDownButton extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.opened = false;
        this.classList.add('drop-down-button')
        this.items;
        this.icon = this.getAttribute("icon");
        this.dropdown_icons = this.getAttribute("dropdown-icons");
        this.text = this.getAttribute("text");
        this.style.width = ''
        this.innerHTML = `  <custom-button icon="${this.icon}" text="${this.text}">
                            </custom-button>
                            <div class="custom-button-dropdown-content">       
                            </div>
                            `

        var button = this.getElementsByTagName('custom-button')[0]
        this.innerHTML += `     <div class="custom-button-dropdown-content">       
                                </div>`
        var dropdown_content = this.getElementsByClassName('custom-button-dropdown-content')[0];


        this.onclick = (ev) => {
           
            dropdown_content.innerHTML = ''
            for(var i = 0; i < this.items.length; i++){
                var el = document.createElement('list-item')
                el.setAttribute('icon', this.dropdown_icons)
                el.setAttribute('text', this.items[i])
                el.onclick = (ev) => {
                    this.value = ev.path[0].innerText
                    this.classList.toggle('opened');
                    dropdown_content.classList.toggle('opened');
                }
                dropdown_content.append(el)
            }
            if(ev.path[0] != dropdown_content && ev.path[1] != dropdown_content && ev.path[2] != dropdown_content){
                if(this.opened){
                    this.opened = false;
                }else{
                    this.opened = true;
                }
    
                this.classList.toggle('opened')
                dropdown_content.classList.toggle('opened')
            }
        }
    }


}
window.customElements.define('drop-down-button', DropDownButton);
export {DropDownButton}
