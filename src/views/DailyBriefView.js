import {View} from '/views/View.js';

class DailyBriefView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')      
        window.API2.get_news('Tech').then(news => {
            console.log(news)
            news.forEach(article => {
                this.append(this.NewsCard(article.author, article.content, article.description.replace( /(<([^>]+)>)/ig, ''), article.publishedAt, article.source, article.title, article.url, article.urlToImage));
            })
            window.DP.dispatch("VIEW_LOAD");
        })
    }

    NewsCard(author, content, description, publishedAt, source, title, url, urlToImage){
        var el = document.createElement('card-item');
        el.innerHTML += `<card-item width="4" image="${urlToImage}" square></card-item>
                        <card-item width="8" style="padding:0; border-radius:0;" blank>
                            <marquee>
                                <h5 style="width:100%; text-align:center; margin:0; line-height:16px; font-size:16px; height:16px; color:var(--theme-primary-color);">${title}</h5>
                            </marquee>
                            <p style="margin:0; font-size:12px;">${description}</p>
                        </card-item>
                        <custom-input onclick="window.location='${url}'" type="button" style="background:var(--theme-background-color);" icon="article" text="Read More"></custom-input>`

        return el;
    }
}
window.customElements.define('daily-brief-view', DailyBriefView);
export{DailyBriefView};