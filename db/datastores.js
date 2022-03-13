const Datastore = require('nedb');

//setup NeDB databases
module.exports = { 
    users: new Datastore({filename:'db/users.db', autoload: true}),
    leagues: new Datastore({filename: 'db/leagues.db', autoload: true}),
    teams: new Datastore({filename: 'db/teams.db', autoload: true}),
    games: new Datastore({filename: 'db/games.db', autoload: true}),
}