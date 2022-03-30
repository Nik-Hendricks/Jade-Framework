const Datastore = require('nedb');

//setup NeDB databases
module.exports = { 
    users: new Datastore({filename:'db/users.db', autoload: true}),
    leagues: new Datastore({filename: 'db/leagues.db', autoload: true}),
    teams: new Datastore({filename: 'db/teams.db', autoload: true}),
    games: new Datastore({filename: 'db/games.db', autoload: true}),
    league_applications: new Datastore({filename: 'db/league_applications.db', autoload: true}),
    posts: new Datastore({filename: 'db/posts.db', autoload: true}),
    post_feeds: new Datastore({filename: 'db/post_feeds.db', autoload: true}),
    subscriptions: new Datastore({filename: 'db/subscriptions.db', autoload: true}),
}