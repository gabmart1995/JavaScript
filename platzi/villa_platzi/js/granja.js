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
		},

		moverCerdo: function( event ) {

			
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

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

// cantidad de animales
var cantidad = 0;
var movimiento = 5;

var x, y;

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

fondo.addEventListener( 'load', validarCarga );
document.addEventListener( 'keydown', moverPersonaje );

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

		cantidad = obtenerNumeroAleatorio( 5, 15 );

		for ( var v = 0; v < cantidad; v++ ) {

			var coorX = obtenerNumeroAleatorio( 0, 10 );
			var coorY = obtenerNumeroAleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.vaca.dibujarVaca( coorX, coorY );
		}
	}

	if ( granja.pollo.ok ) {

		cantidad = obtenerNumeroAleatorio( 5, 15 );

		for ( var p = 0; p < cantidad; p++ ) {

			var coorX = obtenerNumeroAleatorio( 0, 10 );
			var coorY = obtenerNumeroAleatorio( 0, 10 );

			coorX *= 40;
			coorY *= 40;

			granja.pollo.dibujarPollo( coorX, coorY );
		}
	}

	if ( granja.cerdo.ok ) {

		var coorX = obtenerNumeroAleatorio( 0, 10 );
		var coorY = obtenerNumeroAleatorio( 0, 10 );

		coorX *= 40;
		coorY *= 40;

		x = coorX;
		y = coorY;

		granja.cerdo.dibujarCerdo( coorX, coorY );		
	}
}

function obtenerNumeroAleatorio( min, max ) {

	var resultado = Math.floor( Math.random() * ( max - min + 1 ) ) + min; 

	return resultado;
}

function moverPersonaje( event ) {

	switch ( event.keyCode ) {

		case teclas.UP:
					
			granja.cerdo.dibujarCerdo( x, y - movimiento );
			y -= movimiento;

		break;

		case teclas.DOWN:
					
			granja.cerdo.dibujarCerdo( x, y + movimiento );
			y += movimiento;

		break;

		case teclas.LEFT:
					
			granja.cerdo.dibujarCerdo( x - movimiento, y );
			x -= movimiento;

		break;

		case teclas.RIGHT:
					
			granja.cerdo.dibujarCerdo( x + movimiento, y );
			x += movimiento;

		break;

		default:

			console.log( 'La tecla que selecciono es incorrecto' );

		break;
	}
}