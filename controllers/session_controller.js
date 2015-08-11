// diapo 27 del módulo 9.  este middleware solo deja continuar si está autenticado  El orden de aparición es importante
exports.loginRequired = function(req, res, next) {
	  if (req.session.user) {
		  next();
	  } else {
		  res.redirect('/login');
	  }
};


// esto está en la diapo 20 del módulo 9
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors =  {};
	
	res.render('sessions/new', {errors: errors});
};


exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {
			if (error) {
				req.session.errors = [{"message": 'Se ha producido un error: '+error}];
				res.redirect("/login");
				return;
			}
			// crear req.session.uer y guar campos id y username
			// la session se define por la existencia de: req.seesion.udr
			req.session.user = {id:user.id, username: user.username};
			res.redirect(req.session.redir.toString());  //redireccion a path anterior a login
	});
	
};

exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // dicen que redirect a path anterior a login; aprender redir
};
