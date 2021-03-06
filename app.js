﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
/////////var users = require('./routes/users');
//var authors = require('./routes/author');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));   // descomentado a mano diapositiva 26
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false })); // TEMAA 8, diapo 6 recomienda quitar {extended: false}
app.use(bodyParser.urlencoded());
// las dos siguientes son del módulo 9 diapos 15 y siguientes
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// módulo 9
app.use(function(req, res, next) {
//guardar path en session.redir para después del login
	if (! req.path.match(/\/login|\/logout/)) {
		req.session.redir = req.path;
	}
//hacer visile req.session en las vistas
	res.locals.session = req.session;
	next();
});

app.use(function(req, res, next){
  var ahora = new Date().getTime();
  var date = new Date(ahora);
  
// personalizado para que caduque al minuto, por no hacer esperar
  if (req.session.user) {
	 if (90*1000 <= (ahora - req.session.ultimoAcc)){
	 req.session.destroy();
	 } else {
	 req.session.ultimoAcc = ahora;
	 req.session.ultimoHHMM = date.toString();
	 req.session.TXTLIMIT = 'Caducará la sesión en 1 minuto y medio.';
	 }
  }
  next();
 }
);

app.use('/', routes);
/////////////////////////////app.use('/users', users);
/////app.use('/author', authors);

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


module.exports = app;
