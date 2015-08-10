var models = require('../models/models.js');


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

