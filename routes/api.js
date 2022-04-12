// Created 6:30 PM 10/28/2021 Nik Hendricks
// routes/api.js

var datastore = require('../db/datastores.js')
var uniqid = require('uniqid'); 
const axios = require('axios')
//private functions

//public_uniqid = users public_uniqid
function _get_user(public_uniqid){
    return new Promise(resolve => {
        if(public_uniqid){
            datastore.users.findOne({public_uniqid: public_uniqid}, (err, doc) => {
                console.log(doc);
                if(doc){
                    doc.password = 'nah';
                    resolve(doc)
                }else{
                    console.log('not found')
                    resolve({error:'not found'})
                }
            })
        }else{
            resolve({error: 'no public_uniqid supplied'})
        }
    })
}

function _create_game(name, image_url){
    if(!url){
        image_url = null;
    }
    datastore.games.insert({data_type:'game', name: name, image: image_url}, (err, doc) => {
        console.log("ADDED GAME " + name)
    })
}

function _create_post(title, content, author_public_uniqid){
    return new Promise(resolve => {
        var post_uniqid = uniqid();
        datastore.posts.insert({data_type:'post', uniqid: post_uniqid, title: title, content: content, author_public_uniqid: author_public_uniqid}, (err, doc) => {
            datastore.subscriptions.find({to: author_public_uniqid}, (err, subscribers) => {
                console.log(subscribers)
                for(var i = 0; i < subscribers.length; i++){
                    var subscriber_public_uniqid = subscribers[i].from;
                    console.log(subscriber_public_uniqid)
                    datastore.post_feeds.insert({subscriber_public_uniqid: subscriber_public_uniqid, post_uniqid: post_uniqid}, (err, doc) => {
                        if(i == subscribers.length -1){
                            resolve(doc)
                        }
                    })
                }
                
            })
        })

    })
}


function _create_user(username, email, password){
    return new Promise(resolve => {
        var _uniqid = uniqid();
        var public_uniqid = uniqid();
        datastore.users.insert({data_type:'user', username:username, email: email, password: password, permisions: [], public_uniqid: public_uniqid, uniqid:_uniqid }, (err, user) => {
            resolve(user)
        })
    })
}

function _get_posts(){
    return new Promise(resolve => {
        datastore.posts.find({}, (err, docs) => {
            resolve(docs)
        })
    })
}

function _get_public_uniqid_from_uniqid(uniqid){
    return new Promise(resolve => {
        datastore.users.findOne({uniqid: uniqid}, (err, doc) => {
            if(doc){
                resolve(doc.public_uniqid)
            }else{
                resolve({error: 'No Results'})
            }
        })
    })
}

//https://stackoverflow.com/questions/8517089/js-search-in-object-values

function searchFor(obj, toSearch) {
    var results = [];
    toSearch = trimString(toSearch).toLowerCase(); // trim it
    for(var i = 0; i < obj.length; i++){
        for(var key in obj[i]){
            var compare_string = String(obj[i][key]).toLowerCase();
            if(compare_string.indexOf(toSearch)!=-1) {
                if(!itemExists(results, obj[i])) results.push(obj[i]);
            }
        }
    }
    return results;
  }


  function trimString(s) {
    var l=0, r=s.length -1;
    while(l < s.length && s[l] == ' ') l++;
    while(r > l && s[r] == ' ') r-=1;
    return s.substring(l, r+1);
  }
  
  function compareObjects(o1, o2) {
    var k = '';
    for(k in o1) if(o1[k] != o2[k]) return false;
    for(k in o2) if(o1[k] != o2[k]) return false;
    return true;
  }
  
  function itemExists(haystack, needle) {
    for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
    return false;
  }


//to is a public_uniqid as a String
//from is a uniqid as a String
function _subscribe(to, from){
    return new Promise(resolve => {
        _get_public_uniqid_from_uniqid(from).then(res => {
            var to_public_uniqid = to;
            var from_public_uniqid = res;
            console.log('to ' + to_public_uniqid)
            console.log('from ' + from_public_uniqid)
            datastore.subscriptions.findOne({to: to_public_uniqid, from: from_public_uniqid}, (err, exists) => {
                if(exists){
                    resolve({error:'already subscribed'})
                }else{
                    datastore.subscriptions.insert({data_type: "sub", to: to_public_uniqid, from: from_public_uniqid, uniqid: uniqid()}, (err, doc) => {
                        if(doc){
                            resolve(true);
                        }else{
                            resolve(false);
                        }
                    })
                }
            })
        })
    })
}

function _global_search(query, filter){
    console.log(filter)
    return new Promise(resolve => {
        var query_whitelist = ['users', 'leagues', 'teams', 'games', 'posts'];
        var i = 0;
        var res = [];
        for(var key in filter){
            if(query_whitelist.includes(filter[key])){
                datastore[filter[key]].find({}, (err, docs) => {
                    searchFor(docs, query).forEach(item => {
                        res.push(item)
                    })
                    console.log(res)
                    if(i == filter.length){
                        console.log('done')
                        resolve(res)
                    }
                })
            }
            i++
        }
    })
}

function _get_news(query){
    console.log(query)
    return new Promise(resolve => {
        var url = `https://newsapi.org/v2/everything?q=${query}&from=${ new Date().toJSON().slice(0,10)}&sortBy=popularity&language=en&apiKey=4199f3eeb8854d248f9ed3ac545b2ae5`;

        axios.get(url)
          .then(res => resolve(res.data.articles))
          .catch(err => console.log(err))
    })
}

module.exports = (() => {
    'use strict';
    var API = require('express').Router();

    API.use( ( req, res, next ) => {
        console.log(req.originalUrl)
        req.uniqid = req.cookies.uniqid
        req.public_uniqid = req.cookies.public_uniqid;
        next()
    })   

    API.post('/register', (req, res) => {
        console.log(req.body)
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        _create_user(username, email, password).then(user => {
            console.log(user)
            res.json(user)
        })
    })

    API.post('/check_login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        console.log(`username ${username} password ${password}`)
        datastore.users.findOne({username:username, password: password }, (err, doc) => {
            console.log(doc)
            if(doc){
                console.log('user');
                res.json({success: doc})
            }else{
                console.log('no')
            }
        })
    })

    API.post('/get_user', (req, res) => {
        var public_uniqid = req.body.public_uniqid;
        _get_user(public_uniqid).then(result => {
            res.json(result);
        })
    })

    API.post('/get_league', (req, res) => {
        var user_uniqid = req.body.uniqid;
        var league_uniqid = req.body.league_uniqid
        console.log(league_uniqid)
        datastore.leagues.findOne({uniqid: league_uniqid}, (err, doc) => {
            console.log(doc)
            res.json(doc)
        })
    })

    API.post('/create_league', (req, res) => {
        var league_uniqid = uniqid();
        var name = req.body.name;
        var game = req.body.game;
        var premier_date = req.body.premier_date;
        var creator_uniqid = req.uniqid;

        console.log(creator_uniqid)
        datastore.leagues.insert({data_type:'league', creator_uniqid: creator_uniqid,uniqid: league_uniqid, name: name, game: game, premier_date: premier_date, members:[]}, (err, doc) => {
            res.json(doc)
        })
    })

    API.post('/get_managed_leagues', (req, res) => {
        var user_uniqid = req.uniqid;
        datastore.leagues.find({creator_uniqid: user_uniqid}, (err, docs) => {
            res.json(docs);
        })
    })

    API.post("/get_games", (req, res) => {
        //_add_game("")
        datastore.games.find({}, (err, docs) => {
            res.json(docs);
        })
    })

    API.post("/get_league", (req, res) => {
        var league_uniqid = req.json.league_uniqid;
        datastore.leagues.findOne({uniqid: league_uniqid}, (err, doc) => {
            res.json(doc)
        })
    })

    API.post("/get_leagues", (req, res) => {
        datastore.leagues.find({}, (err, docs) => {
            res.json(docs);
        })
    })

    API.post("/get_teams", (req, res) => {
        datastore.teams.find({}, (err, docs) => {
            res.json(docs);
        })
    })

    API.post("/get_league_applicants", (req, res) => {
        var league_uniqid = req.body.league_uniqid;
        datastore.league_applications.find({league_uniqid: league_uniqid}, (err, docs) => {
            res.json(docs);
        })
    })



    API.post("/create_post", (req, res) => {
        var title = req.body.title;
        var content = req.body.content;
        var author_public_uniqid = req.body.author_public_uniqid;
        _create_post(title, content, author_public_uniqid).then(post => {
            res.json(post)
        })
    })

    API.post("/global_search", (req, res) => {
        var query = req.body.query;
        var filter = req.body.filter;
        _global_search(query, filter).then(result => {
            res.json(result);
        })
    })
    
    API.post("/subscribe", (req, res) => {
        var to = req.body.to;
        var from = req.body.from;
        _subscribe(to, from).then(result => {
            res.json(result);
        })
    })

    API.post("/get_post_feed", (req, res) => {
        var results = [];
        datastore.post_feeds.find({subscriber_public_uniqid: req.public_uniqid}, (err, feed) => {
            if(feed){
                var i = 0;
                for(var key in feed){
                    datastore.posts.findOne({uniqid: feed[key].post_uniqid}, (err, post) => {
                        results.push(post);
                        if(i == feed.length - 1){
                            res.json(results)
                        }
                        i++
                    })
                }
                
            }else{
                res.json({error: 'no feed'})
            }
        })
        
    })

    API.post("/remote_log", (req, res) => {
        console.log('----Remote Log---- ' + req.body.title);
        console.log(req.body.data);
    })

    API.post("/create_game", (req, res) => {
        console.log(req.body)
        datastore.games.insert({name: req.body.name, description: req.body.description, image_url: req.body.image_url}, (err, doc) => {
            if(!err){
                if(doc){
                    res.json(doc);
                }
            }
        })
    })

    API.post("/get_news", (req, res) => {
        console.log(req.body)
        _get_news(req.body.query).then(news => {
            res.json(news);
        })
    })

    //public routes here
    
    return API;
})();