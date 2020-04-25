var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// IMPORT ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
var postsRouter = require('./routes/posts.route');
var followsRouter = require('./routes/follows.route');
var messageRouter = require('./routes/message.route');

// IMPORT DB CONNECTION MANAGER
const dbManager = require ("./database.config/database.manager");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*app.use( function(req, res, next)  {
    res.header('Access-Control-Allow-Origin', '*');

// authorized headers for preflight requests
// https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();

app.options('*', function(req, res) {
    // allowed XHR methods
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
res.send();
});
});*/

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    }
    else {
        //move on
        next();
    }
});

//Set the routing routes to the each script
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postsRouter);
app.use('/follows', followsRouter);
app.use('/message', messageRouter);


/**
 * Testing the connection to the database and recreate the models if the tables doesn´t exists  
 */
dbManager.sequelizeConnection.authenticate()
  .then(() => {
    console.log('****Connection has been established successfully.****');
    // recreate the models if the tables doesn´t exists
    dbManager.sequelizeConnection.sync().then(() => {
        console.log("Database Synced");
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;

