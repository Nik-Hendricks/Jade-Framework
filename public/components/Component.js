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
}

export{Component}