var path = require('path');
//cargar modelo orm
var Sequelize = require('sequelize');
//usar bbdd SQLite
var sequelize = new Sequelize(null, null, null, 
		{ dialect : "sqlite", storage: "quiz.sqlite" }
);
// importar la definici�n de la tabal Quiz en quiz.js
var Quiz = sequelize.import(path.join( '.', 'quiz'));	// OJO que no he puesto _dirname
exports.Quiz = Quiz;		// exportar definici�n de talba quiz

//crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function() {
	// success ejecuta el manejador una vez crada la tabla
  Quiz.count().success(function (count) {
	if (count=== 0) {	// inicializar si vac�a
		Quiz.create({ pregunta: 'Capital de Italia',
			      respuesta : 'Roma', respuestaAlta : 'Roma', tema : 'Geograf�a', dificultad : 1
				})
		.success(function() {console.log('Base de datos inicializada')});
	};
  });
});