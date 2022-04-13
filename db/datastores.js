const Datastore = require('nedb');

//setup NeDB databases
module.exports = { 
    test: new Datastore({filename:'db/db_test.db', autoload: true}),
}