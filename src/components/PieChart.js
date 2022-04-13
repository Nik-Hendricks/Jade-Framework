import {Component} from '/components/Component.js';

class PieChart extends Component {
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('pie-chart', 'global-resize')
        this.innerHTML = `  <canvas></canvas>
                            <div class="legend"></div>`
        this.style.display = 'block'
        this.style.margin = 'var(--global-margin)'
        this.parentElement.style.paddingTop = 0;
        this.colors = ['#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#2e86de', '#54a0ff', '#5f27cd']
        this.canvas = this.getElementsByTagName('canvas')[0];
        this.legend = this.getElementsByClassName('legend')[0]
        this.ctx = this.canvas.getContext('2d');
        this.data = [];
    }

    chartify(results){
        this.used_colors = [];
        var counter = 0, total = 0;
        for(var key in results){
            total += results[key].total;
            if(counter == results.length){
                this.drawPie(results, 7)
                
            }
            counter++
        }
    }

    randomColor(){
        var color = this.colors[Math.floor(Math.random() * this.colors.length )]
        if(this.used_colors.indexOf(color) != -1){
            return this.randomColor();
        }else{
            this.used_colors.push(color)
            return color;
        }
    }

    drawPie(results, total){
        var el_width = (this.hasAttribute('legend')) ? this.getBoundingClientRect().width - 50 :this.getBoundingClientRect().width;
        var currentAngle = 0;
        var used_colors = [];
        this.half = (el_width / 2) - 1;
        this.canvas.width = el_width;
        this.canvas.height = el_width;


        for(var key in results){
            var value = results[key]
            var portionAngle = (value.total / total) * 2 * Math.PI;
            var _shade;
            this.ctx.beginPath();
            this.ctx.arc(this.half, this.half, this.half, currentAngle, currentAngle + portionAngle);
            currentAngle += portionAngle;
            this.ctx.lineTo(this.half, this.half);
            if(!value.shade){
                _shade = this.randomColor()
            }else{
                _shade = value.shade
            }
            this.ctx.fillStyle = _shade;
            this.ctx.fill();
            if(this.hasAttribute('legend')){
                this.legend.innerHTML += `<card-item width="2" style="height:20px; background:${_shade};"><p style="float:left; width:100%; text-align:center;">a</p></card-item>`
            }
        }
    }
}

window.customElements.define('pie-chart', PieChart);
export{PieChart};

