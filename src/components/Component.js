class Component extends HTMLElement{

    get_root_child(){
        this.t_e = this;
        while(this.traverse_child(this.t_e) != false){
            this.traverse_child(this.t_e)
        }
        return this.t_e
    }

    traverse_child(el){
        var ch = el.children;
        if(ch.length){
            this.t_e = ch[0]
            return ch[0];
        }else{
            return false;
        }
    }

    getModifiers(){

    }

    resizeComponent(in_row){
        var el_tag = this.tagName.toLowerCase();
        var global_division = window.VM.global_el_division;
        var global_width = (this.parentElement.classList.contains('sidescroller-content')) ? window.VM.main_content_div.offsetWidth: this.parentElement.offsetWidth;
        var global_margin = (this.hasAttribute('nomargin')) ? 0 :parseInt(getComputedStyle(document.documentElement).getPropertyValue('--global-margin').split('px')[0]);
        var unit_size = (global_width / global_division);
        var width = (this.hasAttribute('width')) ? parseInt(this.getAttribute('width')): 12;
        var el_width = (in_row) ?  ((width  * unit_size) - global_margin) - global_margin / in_row : ((width  * unit_size) - global_margin) - global_margin / 1;
        this.style.width = `${el_width}px`
        this.style.float = 'left';
        this.style.position = 'relative'
        this.style.display = 'block';
        
        if(this.hasAttribute('image')){
            this.style.backgroundImage = `url(${this.getAttribute('image')})`
            this.style['background-size'] = `${el_width}px ${el_width}px`;
            if(el_tag == 'card-item'){
                this.style.height = `${this.getBoundingClientRect().width}px`;
            }
        }

        if(el_tag == 'pie-chart'){
            this.chartify(this.data);
        }

        if(this.is_square){
            this.style.height = `${this.getBoundingClientRect().width}px`;
        }

        
        if(this.offsetWidth <= 80){
            var p, span;
            if(this.getAttribute('type') == 'dropdown'){
                p = this.button_text;
                span = this.button_icon;
            }
            p = this.getElementsByTagName('p')[0];
            span = this.getElementsByTagName('span')[0]

            if(p && span){
                p.style['font-size'] = '15px'
                p.style.display = 'none'
                this.style.paddingLeft = '0'
                span.style.position = 'absolute';
                span.style.marginLeft = '50%';
                span.style.left = "-8px"
                if(this.division >= 5){
                    p.style['font-size'] = '11px'
                }
            }
        }
        
    }

    g_rows(){
        var els = this.getElementsByClassName('global-resize');
        var res = []
        for(var i in els){
            console.log(els[i])
            res.push()
        }
    }

    async get_rows(_check_children){
        return new Promise(resolve => {
            var els = this.getElementsByClassName('global-resize');
            var row_map = [], row = [], next_pass = [];
            var width_acumulator = 0;
            for(var i = 0; i < els.length; i++){
                var el = els[i];
                if(i == els.length -1){
                    next_pass.forEach(es => {
                        es.get_rows(false).then(e => {
                            row_map.push(...e)
                        })
                    })
                    resolve(row_map)
                }
                if(el.getElementsByClassName('global-resize').length > 0 && _check_children != false){
                    next_pass.push(el);
                }
                if(next_pass.indexOf(el.parentElement) == -1){
                    width_acumulator += el.hasAttribute('width') ? Number(el.getAttribute('width')) : 12;
                    row.push(el);
                }
                if(width_acumulator >= window.VM.global_el_division){
                    row_map.push(row);
                    row = [];
                    width_acumulator = 0;
                }
            }
        })
    }

    resizeComponents(update){
        if(this.row_map){
            if(update == true){
                this.row_map = undefined;
                this.resizeComponents();
                return;
            }
            this.row_map.forEach(row => {
                row.forEach(el => {
                    el.resizeComponent(row.length);
                })
            });
        }else{
            this.get_rows().then(row_map => {
                this.row_map = row_map;
                row_map.forEach(row => {
                    row.forEach(el => {
                        el.resizeComponent(row.length);
                    })
                });
            })
        }
    }
}

export{Component}