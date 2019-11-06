
//Required libraries. Package.JSON needs to be updated
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var datastore = require('nedb');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var index = require('./routes/index');
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'secret'
}));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('404 Page not found');
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('Error encountered')

});

//Set Ports
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});


module.exports = app;
