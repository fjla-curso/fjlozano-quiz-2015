//definicion del modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	'Comment',
		{ texto : { type : DataTypes.STRING,
					validate : { notEmpty : {msg : " -> Falta comentario" }}
				  } ,
		  publicado: { type : DataTypes.BOOLEAN, defaultValue : false },
		  votospos: DataTypes.INTEGER,
		  votosneg: DataTypes.INTEGER,
		  fecalta: DataTypes.STRING,
		  nick: DataTypes.STRING 
		}
	);
}