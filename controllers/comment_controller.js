var models = require('../models/models.js');

// autoload : id de comentarios
// QUIZ18
exports.load = function(req, res, next, commentId) {
	models.Comment.find({
			where : {
					id : Number(commentId)
			}
	}).then(function(comment) {
	if (comment) {
			req.comment = comment;
			next();
	} else { next(new Error('No existe commentId='+ commentId))}
	}
	).catch(function(error) { next(error) } );
};	



exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId });
};

/* exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz.save( {fields: ["pregunta", "respuesta", "respuestaAlter", "tema", "dificultad" ]}).then(function() { 
	  res.redirect('/quizes');
	})
};
*/
exports.create = function(req, res) {
	var comment  = models.Comment.build( 
	{ texto: req.body.comment.texto,
	  publicado : req.body.comment.publicado,
	  votospos: req.body.comment.votospos,
	  votosneg: req.body.comment.votosneg,
	  fecalta: req.body.comment.fecalta,
	  nick: req.body.comment.nick,
	  QuizId: req.params.quizId
	});
	/*comment
	.validate()
	.then(
	   function(err) {
		    if (err) {
				res.render('comments/new.ejs',
				{ comment: comment, quizid: req.params.quizId });
			} else {
*/		comment.save()
		.then( function() { res.redirect('/quizes/'+req.params.quizId) })
	//		}
	//   }
	//).catch(function(error) {next (error) } );
};
	// [DIAPO 8 personalizada con más campos]
	//quiz.save( {fields: ["pregunta", "respuesta", "respuestaAlter", "tema", "dificultad" ]}).then(function() { ////
	//  res.redirect('/quizes');
	//})


	
// get  que necesita autoload (atención a la segunda línea)
// QUIZ18
exports.publish = function(req, res) {
		req.comment.publicado = true;
		
		req.comment.save( { fields : ["publicado"]  } )
			.then( function () { res.redirect('/quizes/'+req.params.quizId); } )
			.catch( function(error) { next(error) } );
};
exports.publishmas = function(req, res) {
		req.comment.votospos++;
		
		req.comment.save( { fields : ["votospos"]  } )
			.then( function () { res.redirect('/quizes/'+req.params.quizId); } )
			.catch( function(error) { next(error) } );
};
exports.publishmenos = function(req, res) {
		req.comment.votosneg--;
		
		req.comment.save( { fields : ["votosneg"]  } )
			.then( function () { res.redirect('/quizes/'+req.params.quizId); } )
			.catch( function(error) { next(error) } );
};
