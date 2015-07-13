// get /quizes /question
exports.question = function (req, res) {
	res.render('quizes/question', {pregunta: 'Capital de España'});
};

exports.answer = function (req, res) {

   if (req.query.respuesta === 'Madrid') {	
	res.render('quizes/answer', { respuesta: '¡Correcto!', title:"Quiz (a mano)"});
   } else {
	res.render('quizes/answer', { respuesta: '¡Oh, no es correcto!'  , title:"Quiz"  });
   }

};