import {Component} from '/components/Component.js'

class CustomInput extends Component{
    constructor(){
        super();
    };

    get value(){
        return this._value;
    }

    set value(val){
        this._value = val;
        if(this.type == 'dropdown'){
            this.button_text.textContent = val;
            event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, true);
            event.eventName = "change";
            this.dispatchEvent(event)
        }
        if(this.type == 'color'){
            this.getElementsByClassName('material-icons')[0].style.color = this.value;
        }
        if(this.type == 'slider'){
            this.getElementsByTagName('input')[0].value = val;
        }
    }

    set items(val){
        this._items = val;
        this._append_dropdown_items();
    }

    connectedCallback(){
        this.classList.add('global-resize')
        this.type = this.getAttribute('type');
        this.division = this.getAttribute('division');
        this.image = this.getAttribute('image');
        this.icon = this.getAttribute("icon")
        this.text = this.getAttribute('text');
        this.secondary = this.getAttribute('secondary')
        this.variant = this.getAttribute('variant');
        this.rows = this.getAttribute('rows');
        this.toggle = this.hasAttribute('toggle')
        this.width = this.getAttribute('width');
        this.init();
    }

    init(){
        if(this.type){
            if(this.type == "text"){
                this._is_text();
            }else if(this.type == "button"){
                this._is_button();
            }else if(this.type == "textarea"){
                this._is_textarea();
            }else if(this.type == "dropdown"){
                this._is_dropdown();
            }else if(this.type == "password"){
                this._is_password();
            }else if(this.type == "color"){
                this._is_color();
            }else if(this.type== "slider"){
                this._is_slider();
            }
        }
        if(this.hasAttribute('blank')){
            this.style.backgroundColor = 'transparent';
        }
    }

    _is_color(){
        this.classList.add('custom-dropdown-button')
        this.innerHTML = `  <div class="custom-button" style="width:100%; margin: 0px !important; cursor:pointer;">
                                <span class="material-icons">palette</span>
                                <p>${this.text}</p> 
                            </div>
                            <div class="color-picker-container"></div>`

        this.color_picker_container = this.getElementsByClassName('color-picker-container')[0]
        var button = this.getElementsByClassName("custom-button")[0]

        //color_picker.addEventListener("input", (e) => {
        //    this.value = e.target.value
        //    this.getElementsByClassName('material-icons')[0].style.color = this.value;
        //});

        var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

        button.onclick = () => {
            this.color_picker_container.classList.toggle('opened')
            this.color_picker_container.innerHTML = `<card-item style="margin:0px; padding:0;" nomargin><canvas style="margin:var(--global-margin);"></canvas></card-item>`
            this.color_picker_container.style['box-shadow'] = '5px 5px 5px var(--theme-background-color)';
            var c = this.getElementsByTagName('canvas')[0]
            var ctx = c.getContext('2d');
            this.resizeComponents(true);
            c.width = this.getBoundingClientRect().width - 20;
            c.height = this.getBoundingClientRect().width - 20;
            this._render_color_map(c);
            this._draw_middle_rainbow_square(c, 0)
            this._setup_colorwheel_bindings(c);

        }
    }

    _is_text(){
        if(this.hasAttribute('number')){
            this.setAttribute('pattern', "[0-9]*");
            this.setAttribute('inputmode', "numeric");
        }
        this.setAttribute('contenteditable', 'true');
        this.classList.add('custom-text-input');
        this.onkeydown = () => {
            setTimeout(() => {
                this.value = this.textContent;
            }, 200)
        }

        onfocus = this.style.webkitTransform = 'translate3d(0px,-10000px,0)'; requestAnimationFrame(function() { this.style.webkitTransform = ''; }.bind(this))
    }

    _is_button(){
        this.classList.add('custom-button');
        if(this.icon.includes('fa-')){
            this.innerHTML = `
                                    <i class="${this.icon}}"></i>
                                    <p>${this.text}</p> 
                                `
        }else{
            this.innerHTML = `
                                    <span class="material-icons">${this.icon}</span>
                                    <p>${this.text}</p> 
                                `
        }
     
        this.addEventListener("click", () => {
            this.classList.toggle('clicked-animation')
            if(!this.toggle){
                setTimeout(() => {
                    this.classList.toggle('clicked-animation')
                }, 200)
            }
        })
    }

    _is_textarea(){
        this.classList.add('custom-text-input');
        this.setAttribute('contenteditable', 'true');
        if(this.rows){
            this.style.height = `${(this.rows * 16) + 20}px`;
        }
        
        this.onkeydown = () => {
            setTimeout(() => {
                this.value = this.textContent;
            }, 200)
            
        }

    }

    _is_dropdown(){
        if(this.icon && this.text){
            this.classList.add('custom-dropdown-button')
            
            this.innerHTML = `  <div class="custom-button" style="width:100%; margin: 0px !important;">
                                    <span class="material-icons">${this.icon}</span>
                                    <p>${this.text}</p> 
                                </div>
                                <div class="custom-dropdown-button-content"></div>`

            this.button = this.getElementsByTagName('div')[0]
            this.button_text = this.button.getElementsByTagName('p')[0]
            this.button_icon = this.button.getElementsByTagName('span')[0]
            this.dropdown_content = this.getElementsByClassName('custom-dropdown-button-content')[0];    
        }

        this.button.onclick = () => {
            this.dropdown_content.classList.toggle('opened');
        }

        
    }

    _is_password(){
        this.className = 'custom-text-input';
    }

    _is_slider(){
        this.classList.add('slider-input')
        var min = (this.hasAttribute('min')) ? Number(this.getAttribute('min')): 0;
        var max = (this.hasAttribute('max')) ? Number(this.getAttribute('max')): 100;
        this.innerHTML = `<input type="range" min="${min}" max="${max}">`
        this.input = this.getElementsByTagName('input')[0];
    }

    _append_dropdown_items(){
        if(this._items){
            for(var i = 0; i < this._items.length; i++){
                var item = this._items[i]
                var el = document.createElement('list-item');
                el.setAttribute('text', item);
                el.setAttribute('item_number', i);
                el.setAttribute('icon', '');
                if(this.division <= 3){
                    el.setAttribute('icon', this.getAttribute('dropdown_icons'));
                }
        
                el.onclick = (ev) => {
                    this.value = this._items[ev.currentTarget.getAttribute('item_number')]
                    this.dropdown_content.classList.toggle('opened');
                }
                
                this.dropdown_content.append(el);
            }
        }
    }

    _render_color_map(canvas){
        this._clear_canvas(canvas)
        var ctx = canvas.getContext('2d');
        var parent_background = window.getComputedStyle(this).getPropertyValue('--theme-card-color')
        var radius = canvas.width / 2;
        var toRad = (2 * Math.PI) / 360;
        var step = 1 / radius;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < 360; i += step) {
            var rad = i * toRad;
            ctx.strokeStyle = 'hsl(' + i + ', 100%, 50%)';
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.lineTo(radius + radius * Math.cos(rad), radius + radius * Math.sin(rad));
            ctx.stroke();
        }
        ctx.fillStyle = parent_background;
        ctx.beginPath();
        ctx.arc(radius, radius, radius * 0.8, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    _draw_middle_rainbow_square(canvas, hue){
        var ctx = canvas.getContext('2d');
        var startX = Math.floor((canvas.width - 100) / 2);
        var startY = Math.floor((canvas.height - 100) / 2);
        for(var row= startY; row < startY + 100; row++){
            var grad = ctx.createLinearGradient(startX, startY, 100,0);
            grad.addColorStop(0, 'hsl('+hue+', 100%, '+(100-row)+'%)');
            grad.addColorStop(1, 'hsl('+hue+', 0%, '+(100-row)+'%)');
            ctx.fillStyle=grad;
            ctx.fillRect(startX, row, 100, 1);
        }  
    }

    _setup_colorwheel_bindings(canvas){
            var ctx = canvas.getContext('2d');
            var self = this;
            var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
            canvas.addEventListener(touchEvent, (e) => {
                var x = (e.touches) ? e.layerX: e.offsetX;
                var y = (e.touches) ? e.layerY: e.offsetY;
                var imgData = ctx.getImageData(x, y, 1, 1).data;
                self.value = `rgba(${imgData[0]}, ${imgData[1]}, ${imgData[2]}, ${imgData[3]})`
                self._render_color_map(canvas);
                //self._draw_middle_rainbow_square(canvas, imgData[0])
                self._render_color_map_mouse_circle(canvas, x, y);
                self.dispatchEvent(new Event('change'));
                
            }, false);
    }

    _render_color_map_mouse_circle(canvas, x, y){
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = '2';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }

    _clear_canvas(canvas){
        var parent_background = window.getComputedStyle(this).getPropertyValue('--theme-card-color')
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = parent_background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    _on_change(callback){
        this.addEventListener('change', () => {
            if(this.type == 'slider'){
                callback(this.input.value);
            }else{
                callback(this.value);
            }
            
        });
    }

}
window.customElements.define('custom-input', CustomInput);
export {CustomInput}
