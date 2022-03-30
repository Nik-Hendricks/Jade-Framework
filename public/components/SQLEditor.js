import {Component} from '/components/Component.js';

class SQLEditor extends Component{
    constructor(){
        super();

    }

    connectedCallback(){
        this.classList.add('sql-editor')
        this.innerHTML = `<card-item variant="1">
                            <div class="line-number-container">
                                <p>1</p>
                                <p>2</p>
                            </div>
                            <div class="textarea-container">
                                <textarea rows="6"></textarea>
                            </div>
                         </card-item>
                         </br>
                         <custom-button division="2" icon="play_arrow" text="Run"></custom-button>
                         <custom-button division="2" icon="restart_alt" text="Reset"></custom-button>
                         </br>
                         </br>
                         <card-item variant="1" class="output">
                            
                         </card-item>
                         `

        this.line_counter = this.getElementsByClassName('line-number-container')[0]
        this.sql_textarea = this.getElementsByTagName('textarea')[0]
        this.run_button = this.getElementsByTagName('custom-button')[0];
        this.reset_button = this.getElementsByTagName('custom-button')[1];
        this.output_card = this.getElementsByTagName('card-item')[1];
        
        this.reset_button.onclick = () => {
            this.sql_textarea.value = ''
            this.update_line_count();
            this.output_card.innerHTML = ''
        }

        this.run_button.onclick = () => {
            this.output_card.innerHTML = ''
            var sql_code = this.sql_textarea.value;
            window.API2.send_sql(sql_code).then(res => {
                if(res.success){
                    this.construct_table(res.success);
                }else{
                    
                }
            })
        }

        this.update_line_count();
        
    }

    update_line_count(){
        this.line_counter.innerHTML = ''
        this.sql_textarea.oninput = () => {
            this.update_line_count()
        }

        var line_count = this.sql_textarea.value.split(/\r|\r\n|\n/).length;
        for(var i = 0; i < line_count; i ++){
            this.line_counter.innerHTML += `<p>${i + 1}</p>`
        }
    }

    construct_table_head(table, cols){
        
    }

    construct_table(data){
        console.log(data)
        var cols = Object.keys(data[0])
        var table = document.createElement('table');

        var title = table.insertRow();
        cols.forEach(item => {
            title.insertCell().innerHTML += `<b class="theme-primary-color">${item}</b>`
        })

        for(var i = 0; i < data.length; i++){
            var row = table.insertRow();
            console.log(data[i])
            for(var j in data[0]){
                console.log(data[i][j])
                row.insertCell().appendChild(document.createTextNode(data[i][j]))
            }
        }

        this.output_card.append(table);
    }
}
window.customElements.define('sql-editor', SQLEditor);
export{SQLEditor};