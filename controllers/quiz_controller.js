// get /quizes /question
exports.question = function (req, res) {
	res.render('quizes/question', {pregunta: 'Capital de España'});
};

exports.answer = function (req, res) {
   srespuesta = req.query.respuesta;
   srespuesta = srespuesta.toUpperCase();
   // aprende: esta línea lo hace fallar con undefined is not a function: srespuesta = srespuesta.allReplace({'Á': 'A', 'Ó': 'O', 'É': 'E', 'Í': 'I', 'Ú' : 'U', 'Ü': 'U' });
   
   if (srespuesta === 'MADRID') {	
	res.render('quizes/answer', { respuesta: '¡Correcto!', title:"Quiz (a mano)"});
   } else 
   if (srespuesta === '') { 
	// aprende: me muestra el código HTML si lo pongo aquí: res.render('quizes/answer', { respuesta: ' <span style="color:#F00">¿En blanco...? ¡Inténtalo de nuevo!</span> ', title:"Quiz (a mano)"});
	res.render('quizes/answer', { respuesta: '¿En blanco...? ¡Inténtalo de nuevo! ', title:"Quiz (a mano)"});
   } else {
	res.render('quizes/answer', { respuesta: '¡Oh, no es correcto!'  , title:"Quiz"  });
   }

};