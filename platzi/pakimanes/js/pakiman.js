// Clases y Objetos
class Pakiman {

	constructor( nombre, vida, ataque ) {

		this.ataque = ataque;
		this.nombre = nombre;
		this.vida = vida;

		this.imagen = new Image();
		this.imagen.src = imagenes[ this.nombre ];
	}

	hablar() {

		alert( this.nombre );
	}

	mostrar() {

		document.body.appendChild( this.imagen );
		document.write( '<p>' );
		document.write( `<strong>${ this.nombre }</strong><br />` );
		document.write( `Vida: ${ this.nombre }<br />` );
		document.write( `Ataque: ${ this.ataque }` );
		document.write( '</p><hr />' );
	}
}