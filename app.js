/**
 * Module dependencies.
 */
try { require('newrelic'); } catch ( e ) { }
// Don't need it but it's nice to have if we've got it!
var express = require('express');
var compress = require('compression');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var path = require('path');
var request = require("request")
var sass = require('node-sass-middleware');
var errorHandler = require('errorhandler');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var superchargersController = require('./controllers/superchargers');

/**
 * Create Express server.
 */
var app = express();


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  sourceMap: true,
  outputStyle: 'expanded'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/api/superchargers/geo', superchargersController.getGeo);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
