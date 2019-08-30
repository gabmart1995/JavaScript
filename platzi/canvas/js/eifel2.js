var d = document.getElementById( 'dibujito' );
var texto = document.getElementById( 'txtLineas' );
var boton = document.getElementById( 'botoncito' );

var lienzo = d.getContext( '2d' );
var anchoCanvas = d.width;

boton.addEventListener( 'click', dibujoPorClick );

function dibujarLinea( color, xInicial, yInicial, xFinal, yFinal ) {

	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.moveTo( xInicial, yInicial );
	lienzo.lineTo( xFinal, yFinal );
	lienzo.stroke();
	lienzo.closePath();
}

function dibujoPorClick() {

	var lineas = parseInt( texto.value );
	var yI, xF;
	var espacio = anchoCanvas / lineas;

	for ( var contador = 0; contador < lineas; contador++ ) {

		yI = espacio * contador;
		xF = espacio * ( contador + 1 );

		dibujarLinea( 'red', 0, yI, xF, 300 );
		dibujarLinea( 'red', 300, yI, xF, 0 );	
	}
}