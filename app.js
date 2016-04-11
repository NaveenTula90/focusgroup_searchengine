var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var google = require('google')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/csce2110')
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
app.use('/', routes);
app.use('/api',require('./routes/api'));
app.post('/submit_results', function(req, res, next) {
     res.send(200);
});

app.post('/search', function(req, res, next) {

    
        google.resultsPerPage = 30
        var nextCounter = 0

        google(req.body.search, function (err, next, links){
          if (err) console.error(err);
          return_ = []
          for (var i = 0; i < links.length; ++i) {
             if(!isBlank(links[i].link)){
				return_.push({title:links[i].title , link:links[i].link,description:links[i].description}) // link.href is an alias for link.link
             }
          };
		  
          res.send(return_.slice(0,20));
          //if (nextCounter < 4) {
          //  nextCounter += 1;
          //  if (next) next();
          //}
        });
          
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.set('port',8000);
app.listen(app.get('port'));

console.log('listening to port:'+ app.get('port'))

module.exports = app;
