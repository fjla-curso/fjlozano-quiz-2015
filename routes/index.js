var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. que usar los views*.ejs */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz (a mano)' });
});
router.get('/author', function(req, res) {
  res.render('author', { title: 'Todos los autores de Quiz (a mano)', subtitle: 'Quiz (a mano)', autores: 'F.Javier Lozano' });
});

// Autoload de comandos con  :quizId  módulo 7 parte 10
router.param('quizId', quizController.load);


// version con varias preguntas y cada una es una parte de la URL
router.get('/quizes', quizController.index );
router.get('/quizes/:quizId(\\d+)', quizController.show );
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer );
router.get('/quizes/new',  quizController.new);
router.post('/quizes/create',  quizController.create);  // ATENCION, que es un POST no un GET (esto es clave)
//version con 1 sola pregunta no tenía parámetros
//router.get('/quizes/question', quizController.question );
//router.get('/quizes/answer', quizController.answer );

/*
router.get('/quizes', function(req, res) {
  res.render('quizes/question', { title: 'Quiz. Comienzan las preguntas', subtitle: 'Quiz (a mano)' });
});
*/
module.exports = router;
