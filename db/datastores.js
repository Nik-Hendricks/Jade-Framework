const Datastore = require('nedb');

//setup NeDB databases
module.exports = { 
    users: new Datastore({filename:'db/users.db', autoload: true}),
}