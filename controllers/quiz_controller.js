var models = require('../models/models.js');

// get /quizes /question
exports.show = function (req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de España'});	// sin BD tipo modulo 6
	models.Quiz.find(req.params.quizId).then(function(quiz) {		// antes en lugar de then era success
		res.render('quizes/show', {quiz : quiz }); // antes pasaba cada campo: {eltema: quiz[0].tema, ladificultad: quiz[0].dificultad , pregunta: quiz[0].pregunta});
	})
};
// get /quizes /question cuando era una pregunta sola
/*
exports.question = function (req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de España'});	// sin BD tipo modulo 6
	models.Quiz.findAll().then(function(quiz) {		// antes en lugar de then era success
		res.render('quizes/question', {eltema: quiz[0].tema, ladificultad: quiz[0].dificultad , pregunta: quiz[0].pregunta});
	})
};
*/
exports.answer = function (req, res) {
// primra versión con un registro	models.Quiz.findAll().then(function(quiz) {// antes en lugar de then era success. por cambiar de versión por deprecated. Aviso de Daniel
// ahora busca un registro por su ID.
	models.Quiz.find(req.params.quizId).then(function(quiz) {
   // sin base de datos: srespuesta = req.query.respuesta;
   srespuesta = quiz.respuesta;  // antes era quiz[0] por ser un registro
   srespuesta = srespuesta.toUpperCase();
   // aprende: esta línea lo hace fallar con undefined is not a function: srespuesta = srespuesta.allReplace({'Á': 'A', 'Ó': 'O', 'É': 'E', 'Í': 'I', 'Ú' : 'U', 'Ü': 'U' });
   
   if (srespuesta === req.query.respuesta.toUpperCase()) {	
   
	res.render('quizes/answer', { quiz: quiz, respuesta: '¡Correcto!', title:"Quiz (a mano)"});
   } else 
   if (srespuesta === '') { 
	// aprende: me muestra el código HTML si lo pongo aquí: res.render('quizes/answer', { respuesta: ' <span style="color:#F00">¿En blanco...? ¡Inténtalo de nuevo!</span> ', title:"Quiz (a mano)"});
	res.render('quizes/answer', { respuesta: '¿En blanco...? ¡Inténtalo de nuevo! ', title:"Quiz (un esfuerzo...)"});
   } else {
	res.render('quizes/answer', { quiz : quiz, respuesta: '¡Oh, '+req.query.respuesta+' no es correcto! Es '+srespuesta  , title:"Quiz (Oh)"  });
   }
	})
};

exports.index = function (req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de España'});	// sin BD tipo modulo 6
	models.Quiz.findAll().then(function(quizes) {		// antes en lugar de then era success
		res.render('quizes/index.ejs', { quizes : quizes });
	})
};