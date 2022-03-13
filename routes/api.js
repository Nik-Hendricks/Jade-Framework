// Created 6:30 PM 10/28/2021 Nik Hendricks
// routes/api.js

var datastore = require('../db/datastores.js')
var uniqid = require('uniqid'); 

//private functions


function _get_user(uniqid){
    return new Promise(resolve => {
        if(uniqid){
            datastore.users.findOne({uniqid: uniqid}, (err, doc) => {
                console.log(doc)
                if(doc){
                    doc.password = 'nah'
                    resolve(doc)
                }else{
                    console.log('not found')
                    resolve({error:'not found'})
                }
            })
        }else{
            resolve({error: 'no uniqid supplied'})
        }
    })
}

function _add_game(name){
    datastore.games.insert({name: name}, (err, doc) => {
        console.log("ADDED GAME " + name)
    })
}

module.exports = (() => {
    'use strict';
    var API = require('express').Router();

    API.use( ( req, res, next ) => {
        console.log(req.originalUrl)
        req.uniqid = req.cookies.uniqid
        next()
    })   

    API.post('/register', (req, res) => {
        console.log(req.body)
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var _uniqid = uniqid();
        datastore.users.insert({username:username, email: email, password: password, permisions: [], uniqid:_uniqid }, (err, docs) => {
            res.json(docs)
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
        var uniqid = req.body.uniqid;
        _get_user(uniqid).then(result => {
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
        datastore.leagues.insert({creator_uniqid: creator_uniqid,uniqid: league_uniqid, name: name, game: game, premier_date: premier_date, members:[]}, (err, doc) => {
            res.json(doc)
        })
    })

    API.post('/get_managed_leagues', (req, res) => {
        var user_uniqid = req.uniqid;
        datastore.leagues.find({creator_uniqid: user_uniqid}, (err, docs) => {
            res.json(docs)
        })
    })

    API.post("/get_games", (req, res) => {
        //_add_game("")
        datastore.games.find({}, (err, docs) => {
            res.json(docs)
        })
    })

    API.post("/get_league", (req, res) => {
        var league_uniqid = req.json.league_uniqid;
        datastore.leagues.findOne({uniqid: league_uniqid}, (err, doc) => {
            res.json(doc)
        })
    })

    //public routes here
    
    return API;
})();