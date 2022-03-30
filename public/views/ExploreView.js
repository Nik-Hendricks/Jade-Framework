import {View} from '/views/View.js';

class ExploreView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <h4>Leagues:</h4>
                            <side-scroller>
                            </side-scroller>
                            <h4>Games:</h4>
                            <side-scroller>
                            </side-scroller>
                            <h4>Teams:</h4>
                            <side-scroller>
                            </side-scroller>
                            `
        window.API2.get_leagues().then(leagues => {
            console.log(leagues)
            var leagues_sidescroller = this.getElementsByTagName('side-scroller')[0];
            
            for(var i = 0; i < leagues.length; i++){
                leagues_sidescroller.root_el.innerHTML += `<card-item title="${leagues[i].name}"></card-item>`
            }
            window.API2.get_games().then(games => {
                var games_sidescroller = this.getElementsByTagName('side-scroller')[1];
                for(var i = 0; i < games.length; i++){
                    games_sidescroller.root_el.innerHTML += `<card-item style="width:120px;" title="${games[i].name}" image="${games[i].image_url}"></card-item>`
                }

                window.API2.get_teams().then(teams => {
                    var teams_sidescroller = this.getElementsByTagName('side-scroller')[2];
                    for(var i = 0; i < teams.length; i++){
                        teams_sidescroller.root_el.innerHTML += `<card-item style="width:120px;" title="${games[i].name}" image="${games[i].image_url}"></card-item>`
                    }
                    window.DP.dispatch('VIEW_LOAD');
                })
                
            })
            
        })


    }
}
window.customElements.define('explore-view', ExploreView);
export{ExploreView};