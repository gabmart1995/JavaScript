function home( peticion, respuesta ) {

	respuesta.send( 'Este es el <strong>Home</strong>' );
}

function cursos( peticion, respuesta ) {

	respuesta.send( 'Estos son los <strong>Cursos</strong>' );
}

function mensaje() {

	console.log( 'Escuchando en el puerto 8080' );
}

module.exports = {
	home,
	cursos,
	mensaje
};
