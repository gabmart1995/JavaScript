var vp = document.getElementById( 'villaPlatzi' );
var papel = vp.getContext( '2d' );

var granja = {
	
	mapa: {

		url: './../materiales/tile.png',
		ok: false,

		dibujarMapa: function() {
			papel.drawImage( fondo, 0, 0 ); 
		}
	},

	vaca: {

		url: './../materiales/vaca.png',
		ok: false,

		dibujarVaca: function( x, y ) {
			papel.drawImage( vaca, x, y );
		}
	},

	cerdo: {

		url: './../materiales/cerdo.png',
		ok: false,

		dibujarCerdo: function( x, y ) {
			papel.drawImage( cerdo, x, y );
		}
	},

	pollo: {

		url: './../materiales/pollo.png',
		ok: false,

		dibujarPollo: function( x, y ) {
			papel.drawImage( pollo, x, y );
		}
	}
};

// cantidad de animales
var cantidad = 0;

// etiqueta de imagenes
var fondo = new Image();
var vaca = new Image();
var cerdo = new Image();
var pollo = new Image();

fondo.src = granja.mapa.url;
vaca.src = granja.vaca.url;
cerdo.src = granja.cerdo.url;
pollo.src = granja.pollo.url;

fondo.addEventListener( 'load', validarCarga );

function aleatorio( min, max ) {

	return resultado = Math.floor( Math.random() *( max - min + 1 ) ) + min;
}

function validarCarga() {

	granja.mapa.ok = true;
	granja.vaca.ok = true;
	granja.cerdo.ok = true;
	granja.pollo.ok = true;

	dibujar();
}

function dibujar() {

	if ( granja.mapa.ok ) {
		
		granja.mapa.dibujarMapa();
	}

	if ( granja.vaca.ok ) {

		cantidad = aleatorio( 5, 15 );

		console.log( `cantidad de vacas ${ cantidad }` );

		for ( var v = 0; v < cantidad; v++ ) {

			var coorX = aleatorio( 0, 10 );
			var coorY = aleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.vaca.dibujarVaca( coorX, coorY );
		}
	}

	if ( granja.cerdo.ok ) {

		cantidad = aleatorio( 5, 15 );

		console.log( `cantidad de cerdos ${ cantidad }` );

		for ( var c = 0; c < cantidad; c++ ) {

			var coorX = aleatorio( 0, 10 );
			var coorY = aleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.cerdo.dibujarCerdo( coorX, coorY );
		}

	}

	if ( granja.pollo.ok ) {

		cantidad = aleatorio( 5, 15 );

		console.log( `cantidad de pollos ${ cantidad }` );

		for ( var p = 0; p < cantidad; p++ ) {

			var coorX = aleatorio( 0, 10 );
			var coorY = aleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.pollo.dibujarPollo( coorX, coorY );
		}
	}
}