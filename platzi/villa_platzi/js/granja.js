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
	},

	recargarCanvas: function( x, y ) {

		/*
			Se recarga todo el canvas desde el fondo
			y todos los animales
		*/

		var posXVaca = 0; 
		var posYVaca = 0;
		var posXPollo = 0;
		var posYPollo = 0;

		granja.mapa.dibujarMapa(); 

		for ( var p = 0; p < cantidadPollos; p++ ) {

			if ( ( p % 2 ) === 0 ) {
				posXPollo = coordPollos[p];
			}

			else {
				posYPollo = coordPollos[p];
			}

			granja.pollo.dibujarPollo( posXPollo, posYPollo );
		}

		for ( var v = 0; v < cantidadVacas; v++ ) {

			if ( ( v % 2 ) === 0 ) {
				posXVaca = coordVacas[v];
			}

			else {
				posYVaca = coordVacas[v];
			}

			granja.vaca.dibujarVaca( posXVaca, posYVaca );
		}

		granja.cerdo.dibujarCerdo( x, y );
	}
};

var teclas = {
	
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

// cantidad de animales
var cantidadVacas = 0;
var cantidadPollos = 0;
var movimiento = 5;

// coordenadas
var x, y;
var coordPollos = [];
var coordVacas = [];

// elementos HTML
var vp = document.getElementById( 'villaPlatzi' );
var papel = vp.getContext( '2d' );

var fondo = new Image();
var vaca = new Image();
var pollo = new Image();
var cerdo = new Image();

fondo.src = granja.mapa.url;
vaca.src = granja.vaca.url;
pollo.src = granja.pollo.url;
cerdo.src = granja.cerdo.url;

// eventos
fondo.addEventListener( 'load', validarCarga );
document.addEventListener( 'keydown', moverCerdo );

function validarCarga() {

	granja.mapa.ok = true;
	granja.vaca.ok = true;
	granja.pollo.ok = true;
	granja.cerdo.ok = true;

	dibujar();
}

function dibujar() {

	if ( granja.mapa.ok ) {

		granja.mapa.dibujarMapa();
	}

	if ( granja.vaca.ok ) {

		cantidadVacas = obtenerNumeroAleatorio( 5, 15 );
		// console.log( cantidadVacas );

		for ( var v = 0; v < cantidadVacas; v++ ) {

			var coorX = obtenerNumeroAleatorio( 0, 10 );
			var coorY = obtenerNumeroAleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.vaca.dibujarVaca( coorX, coorY );

			// guarda las coordenadas en el arreglo
			coordVacas.unshift( coorX, coorY );
		}
	}

	if ( granja.pollo.ok ) {

		cantidadPollos = obtenerNumeroAleatorio( 5, 15 );
		// console.log( cantidadPollos );

		for ( var p = 0; p < cantidadPollos; p++ ) {

			var coorX = obtenerNumeroAleatorio( 0, 10 );
			var coorY = obtenerNumeroAleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.pollo.dibujarPollo( coorX, coorY );

			// coloca las coordenadas en el arreglo
			coordPollos.unshift( coorX, coorY );
		}
	}

	if ( granja.cerdo.ok ) {

		var coorX = obtenerNumeroAleatorio( 0, 10 );
		var coorY = obtenerNumeroAleatorio( 0, 10 );

		coorX *= 40;
		coorY *= 40;

		// movimiento
		x = coorX;
		y = coorY;

		granja.cerdo.dibujarCerdo( coorX, coorY );		
	}
}

function obtenerNumeroAleatorio( min, max ) {

	var resultado = Math.floor( Math.random() * ( max - min + 1 ) ) + min; 

	return resultado;
}

function moverCerdo( event ) {

	switch ( event.keyCode ) {

		case teclas.UP:
			
			granja.recargarCanvas( x, y - movimiento );
			y -= movimiento;

		break;

		case teclas.DOWN:
					
			granja.recargarCanvas( x, y + movimiento );
			y += movimiento;

		break;

		case teclas.LEFT:
					
			granja.recargarCanvas( x - movimiento, y );
			x -= movimiento;

		break;

		case teclas.RIGHT:
					
			granja.recargarCanvas( x + movimiento, y );
			x += movimiento;

		break;

		default:

			// console.log( 'La tecla que selecciono es incorrecto' );

		break;
	}
}