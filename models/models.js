var path = require('path');
//cargar modelo orm
var Sequelize = require('sequelize');
//usar bbdd SQLite
var sequelize = new Sequelize(null, null, null, 
		{ dialect : "sqlite", storage: "quiz.sqlite" }
);
// importar la definición de la tabal Quiz en quiz.js
var Quiz = sequelize.import(path.join( '.', 'quiz'));	// OJO que no he puesto _dirname
exports.Quiz = Quiz;		// exportar definición de talba quiz

//crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function() {
	// success ejecuta el manejador una vez crada la tabla
  Quiz.count().success(function (count) {
	if (count=== 0) {	// inicializar si vacía
		Quiz.create({ pregunta: 'Capital de Italia',
			      respuesta : 'Roma', respuestaAlta : 'Roma', tema : 'Geografía', dificultad : 1
				})
		.success(function() {console.log('Base de datos inicializada')});
	};
  });
});