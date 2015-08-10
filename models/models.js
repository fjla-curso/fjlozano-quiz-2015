var path = require('path');
//cargar modelo orm
var Sequelize = require('sequelize');
//usar bbdd SQLite
var sequelize = new Sequelize(null, null, null, 
		{ dialect : "sqlite", storage: "quiz.sqlite" }
);
// importar la definición de la tabal Quiz en quiz.js
var Quiz = sequelize.import(path.join( '.', 'quiz'));	// OJO que no he puesto _dirname
var Comment = sequelize.import(path.join( '.', 'comment'));	// OJO que no he puesto _dirname que en el curso (mod 9 diapo 5)

// definir relaciones mod 9 diampo 5
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;		// exportar definición de tabla quiz
exports.Comment = Comment;		// exportar definición de tabla comment


//crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function() {
	// success ejecuta el manejador una vez crada la tabla
  Quiz.count().then(function (count) {
	if (count === 0) {	// inicializar si vacía
		Quiz.create({ pregunta: 'Capital de Italia',
			      respuesta : 'Roma', 
				  respuestaAlter : 'Roma', 
				  tema : 'Geografía', 
				  dificultad : 1
				});
		Quiz.create({ pregunta: 'Capital de Portugal',
			      respuesta : 'Lisboa', 
				  respuestaAlter : 'Lisboa', 
				  tema : 'Geografía', 
				  dificultad : 1
				});
		Quiz.create({ pregunta: 'En que ciudad nació el artista renacentista Leonardo da Vinci',
			      respuesta : 'Vinci', 
				  respuestaAlter : 'Vinci', 
				  tema : 'Humanidades', 
				  dificultad : 1
				});		
		Quiz.create({ pregunta: 'La unidad más pequeña de una sustancia que conserva sus características es la',
			      respuesta : 'molécula', 
				  respuestaAlter : 'molécula', 
				  tema : 'Ciencia', 
				  dificultad : 1
				});		
		Quiz.create({ pregunta: 'El sistema binario de numeración ¿cuántos dígitos distintos tiene?',
			      respuesta : 'dos', 
				  respuestaAlter : '2', 
				  tema : 'Tecnología', 
				  dificultad : 2
				})
		.then(function() {console.log('Base de datos inicializada')});
	};
  });
});