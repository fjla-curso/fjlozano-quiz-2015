// esto está en la diapo 21 del módulo 9
var users = { admin: {id : 1, username : "admin", password: "1234"},
			  pepe:  {id : 2, username : "pepe",  password: "5678"},
			  yo:    {id : 3, username : "fjla",  password: "2222"}
};

//comprobar si usuario es de los registrados en users
//Si falla lanza un callback(error)

exports.autenticar = function(login, password, callback) {
		if(users[login]) {
			if (password === users[login].password) {
					callback(null, users[login]);
			}
			else { callback(new Error('Password erróneo.')); }
		} else { callback(new Error('No existe el usuario.'));}
};