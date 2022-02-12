const express = require('express');
var compression = require('compression')
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
var http = require('http');
var https = require('https');
var forceSsl = require('express-force-ssl');
const io = require('socket.io')(http);
const fs = require('fs')        
const uniqid = require('uniqid')

//routes
var API = require('./routes/api.js');

const cert = fs.readFileSync(__dirname + '/certificate/cert.cert');
//const ca = fs.readFileSync(__dirname + '/certificate/key.key');
const key = fs.readFileSync(__dirname + '/certificate/key.key');

var credentials = {key: key, cert: cert};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


//app.use(forceSsl);
app.use(compression())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get("/js/:file",function(req, res){
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/js/' + file)
    });
    res.sendFile(__dirname + '/public/js/' + file)
})

app.get("/css/:file", (req, res) => {
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/css',
      'Content-Length': getFilesizeInBytes(__dirname + '/public/css/' + file)
    });
    res.sendFile(__dirname + '/public/css/'+file)
})

app.get("/img/:file",function(req, res){
    var file = req.param('file')
    res.header({
      'Content-Type': 'image/png',
      'Content-Length': getFilesizeInBytes(__dirname + '/public/img/' + file)
    });
    res.sendFile(__dirname + '/public/img/'+file)
})

app.get("/components/:file", (req, res) => {
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/components/' + file)
    });
    res.sendFile(__dirname + '/public/components/' + file)
})

app.get("/views/:file", (req, res) => {
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/views/' + file)
    });
    res.sendFile(__dirname + '/public/views/' + file)
})

app.get('/terms-of-service', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get("/privacy-policy", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/favicon.ico', (req, res) => {
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/img/icons-512.png')
    });
    res.sendFile(__dirname + '/public/img/icons-512.png')
})

app.get("/manifest.json", (req, res) => {
    res.sendFile(`${__dirname}/public/manifest.json`)
})

app.get("/robots.txt", (req, res) => {
    res.sendFile(`${__dirname}/public/robots.txt`)
})

app.get("/worker", (req, res) => {
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/web_service_worker.js')
    });
    res.sendFile(`${__dirname}/web_service_worker.js`)
})

app.get("/.well-known/pki-validation/F9A45775F1E2B768DD51029E25983812.txt", (req, res) => {
    res.sendFile(`${__dirname}/ssl-validation.txt`)
})

app.get("/googlecec516bfa00ff236.html", (req, res) => {
    res.sendFile(`${__dirname}/googlecec516bfa00ff236.html`);
})



app.use('/API', API)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})




httpServer.listen(80);
httpsServer.listen(443);



function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}