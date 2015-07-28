//definicion del modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ pregunta : DataTypes.STRING,
		  respuesta: DataTypes.STRING,
		  respuestaAlt: DataTypes.STRING,
		  tema: DataTypes.STRING,
		  dificultad: DataTypes.INTEGER
});
}