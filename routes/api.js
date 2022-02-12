// Created 6:30 PM 10/28/2021 Nik Hendricks
// routes/api.js

var datastore = require('../db/datastores.js')
var uniqid = require('uniqid')

//private functions


module.exports = (() => {
    'use strict';
    var API = require('express').Router();

    API.use( ( req, res, next ) => {
        console.log(req.originalUrl)
        req.g_uid = req.cookies.g_uid;
        req.public_uid = req.cookies.public_uid;
        next()
    })   

    //public routes here
    
    return API;
})();