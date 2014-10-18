var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    dbConfig = require('./knexfile'),
    knex = require('knex')(dbConfig.development),
    bookshelf = require('bookshelf')(knex),
    bookshelfModel = require('bookshelf-model')
    expressRouteController = require('express-route-controller2');

var allowCrossDomain = require('./filters/allow_cross_domain.js');

var app = express();

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev')); 

app.locals.models = bookshelfModel(bookshelf, __dirname + '/models');

expressRouteController(app, {
    controllers: __dirname + '/controllers',
    routes: require('./routes.json')
});

var server = app.listen(3000, function() {
  console.log('Express started at port %d', server.address().port);
});