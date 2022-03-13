import {View} from '/views/View.js';

class NewLeagueView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <h4>Name:</h4>
                            <input type="text"></input>
                            <h4>Game:</h4>
                            <drop-down-button id="games-dropdown" dropdown-icons="sports_esports" icon="sports_esports" text="Game"></drop-down-button>
                            <h4>Premier Date</h4>
                            <custom-calendar>
                            </custom-calendar>
                            <custom-button id="create-league" variant="wide" icon="add" text="Create League"></custom-button>`

        var calendar = this.getElementsByTagName('custom-calendar')[0]
        var games_dropdown = document.getElementById('games-dropdown');
        var create_league_button = document.getElementById('create-league');
    
        window.API2.get_games().then(games => {
            games_dropdown.items = games;

            calendar.on_date_clicked(date => {
                this.premier_date = date;
            })

            create_league_button.onclick = () => {
                var name = this.getElementsByTagName('input')[0].value;
                var selected_game = games_dropdown.value
                if(name == undefined || name == '' || this.premier_date == undefined || selected_game == undefined){

                }else{
                    window.API2.create_league(name, selected_game, this.premier_date).then(league => {
                        console.log(league)
                        window.history.back();
                    })
                }
            }

            window.DP.dispatch("VIEW_LOAD");
            
        })

        
    }
}
window.customElements.define('new-league-view', NewLeagueView);
export{NewLeagueView};