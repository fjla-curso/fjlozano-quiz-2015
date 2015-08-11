var models = require('../models/models.js');


// tema 10
// Autoload de comandos con  :quizId  módulo 7 parte 10  pone los catch y parametriza los req.quiz
exports.load = function(req, res, next, quizId) {
		models.Quiz.find(
			{		// nuevo para tabla de comentarios
			where : { id: Number(quizId) },
			include : [{ model : models.Comment }]
			}
			).then(
			function(quiz) {
				if (quiz) {
					req.quiz = quiz;
					next();
				} else { next(new Error('No existe quizId=' + quizId)); }
			}
		).catch(function(error) { next (error); })
};

// get /quizes /question
exports.show = function (req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de España'});	// sin BD tipo modulo 6
	models.Quiz.find(req.params.quizId).then(function(quiz) {		// antes en lugar de then era success
		res.render('quizes/show', {quiz :  req.quiz  }); // antes pasaba cada campo: {eltema: quiz[0].tema, ladificultad: quiz[0].dificultad , pregunta: quiz[0].pregunta});
		// y ojo que igual hay que pasar pronto comments: comments para que aparezcan OJO.
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
// primera versión con un registro	models.Quiz.findAll().then(function(quiz) {// antes en lugar de then era success. por cambiar de versión por deprecated. Aviso de Daniel
// ahora busca un registro por su ID.
	models.Quiz.find(req.params.quizId).then(function(quiz) {
   // sin base de datos: srespuesta = req.query.respuesta;
   srespuesta = req.quiz.respuesta;  // antes era quiz[0] por ser un registro
   srespuesta = srespuesta.toUpperCase();
   // aprende: esta línea lo hace fallar con undefined is not a function: srespuesta = srespuesta.allReplace({'Á': 'A', 'Ó': 'O', 'É': 'E', 'Í': 'I', 'Ú' : 'U', 'Ü': 'U' });
   srespuestaAlter = req.quiz.respuestaAlter;  // cuando la respuesta se puede esbribir de dos formas
   srespuestaAlter = srespuestaAlter.toUpperCase();
   
   if ( (srespuesta === req.query.respuesta.toUpperCase()) || (srespuestaAlter === req.query.respuesta.toUpperCase()) ) {	
   
	res.render('quizes/answer', { quiz: req.quiz, respuesta: '¡Correcto!', title:"Quiz (a mano)"});
   } else 
   if (req.query.respuesta === '') { 
	// aprende: me muestra el código HTML si lo pongo aquí: res.render('quizes/answer', { respuesta: ' <span style="color:#F00">¿En blanco...? ¡Inténtalo de nuevo!</span> ', title:"Quiz (a mano)"});
	res.render('quizes/answer', { quiz : req.quiz, respuesta: '¿En blanco...? ¡Inténtalo de nuevo! ', title:"Quiz (un esfuerzo...)"});
   } else {
	res.render('quizes/answer', { quiz : req.quiz, respuesta: '¡Oh, '+req.query.respuesta+' no es correcto! ', title:"Quiz (Oh)"  });
   }
	})
};

exports.index = function (req, res) {
// modulo 7
	if(req.query.search || req.query.searchTema || req.query.searchdificultad) {
		var filtro=(req.query.search||'').replace(' ', '%');  // Poner % en lugar de espacios si queremos que busque varias palabras no necesariamente seguidas
		var filtroTema=(req.query.searchTema||'');  // Poner % en lugar de espacios si queremos que busque varias palabras no necesariamente seguidas
		var filtrodificultad1=(req.query.searchdificultad||1);
		var filtrodificultad2=(req.query.searchdificultad||3);  // número
 		models.Quiz.findAll({
				where: [
			
				
					{pregunta : { like : '%'+filtro+'%'} }   ,
				    {tema     : { like : '%'+filtroTema+'%'} } ,
				    {dificultad  : { gte : filtrodificultad1 }  } ,
				    {dificultad  : { lte : filtrodificultad2 }  } 
				],order:'pregunta ASC'
			//[     'pregunta like ?','%'+filtro+'%'    ],order:'pregunta ASC'
 			}).then(function(quizes){
				res.render('quizes/index', {quizes:quizes});
			}).catch(function(error){next(error);});
    } else {
		//res.render('quizes/question', {pregunta: 'Capital de España'});	// sin BD tipo modulo 6
		models.Quiz.findAll().then(function(quizes) {		// antes en lugar de then era success
		  res.render('quizes/index.ejs', { quizes : quizes });
		}).catch(function(error) { next(error);})
	}	
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build(
	{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz});
};


exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz.save( {fields: ["pregunta", "respuesta", "respuestaAlter", "tema", "dificultad" ]}).then(function() { 
	  res.redirect('/quizes');
	})
};

exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() { 
	  res.redirect('/quizes');
	}).catch(function(error) {next (error)});
};
