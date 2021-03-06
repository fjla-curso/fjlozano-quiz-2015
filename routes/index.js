var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. que usar los views*.ejs */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz (a mano)' });
});

router.get('/author', function(req, res) {
  res.render('author', { title: 'Todos los autores de Quiz (a mano)', subtitle: 'Quiz (a mano)', autores: 'F.Javier Lozano' });
});

// Autoload de comandos con  :quizId  módulo 7 parte 10
router.param('quizId', quizController.load);	// autoload :quizId
// Autoload de comandos con  :quizId  módulo 9 diapo 32
// QUIZ18 
router.param('commentId', commentController.load);	// autoload :commentId

// modulo 9 definicion ruta session
router.get('/login', sessionController.new);  	// formulario de login
router.post('/login', sessionController.create);  	// crea session
router.get('/logout', sessionController.destroy);  	// destruye session



// version con varias preguntas y cada una es una parte de la URL
router.get('/quizes', quizController.index );
router.get('/quizes/:quizId(\\d+)', quizController.show );
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer );
router.get('/quizes/new',  			sessionController.loginRequired, quizController.new);		// control de sesiones añadido módulo 9 diapo 26, la el alta de preguntas
router.post('/quizes/create',   	sessionController.loginRequired, quizController.create);  // ATENCION, que es un POST no un GET (esto es clave)
//version con 1 sola pregunta no tenía parámetros
//router.get('/quizes/question', quizController.question );
//router.get('/quizes/answer', quizController.answer );
// borrado
router.delete('/quizes/:quizId(\\d+)',  sessionController.loginRequired, quizController.destroy);  // ATENCION, que es un DELETE no un POST (esto es clave).  Control de sesiones añadido para borrar solo por usuarios registrados

// comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',  	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',  		commentController.create);  // ATENCION, que es un POST no un GET (esto es clave)
// QUIZ18 no funciona la moderación de comentarios. ¿por qué? 
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publishmas', sessionController.loginRequired, commentController.publishmas);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publishmenos', sessionController.loginRequired, commentController.publishmenos);
/*
router.get('/quizes', function(req, res) {
  res.render('quizes/question', { title: 'Quiz. Comienzan las preguntas', subtitle: 'Quiz (a mano)' });
});
*/
module.exports = router;
