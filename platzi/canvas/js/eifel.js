var d = document.getElementById( 'dibujito' );
var lienzo = d.getContext( '2d' );

var e = document.getElementById( 'dibujito2' );
var lienzo2 = e.getContext( '2d' );

var f = document.getElementById( 'dibujito3' );
var lienzo3 = f.getContext( '2d' );

var lineas = 30;
var contador = 0;
var yI, xF;

while ( contador < lineas ) {

	yI = 10 * contador;
	xF = 10 * ( contador + 1 );

	dibujarLinea( 'blue', 0, yI, xF, 300, lienzo );
	dibujarLinea( 'blue', 300, yI, xF, 0, lienzo );

	contador++;
}

for ( contador = 0; contador < lineas; contador++ ) {

	yI = 10 * contador;
	xF = 10 * ( contador + 1 );

	dibujarLinea( 'red', 0, yI, xF, 300, lienzo2 );
	dibujarLinea( 'red', 300, yI, xF, 0, lienzo2 );	
}

contador = 0;

do {

	yI = 10 * contador;
	xF = 10 * ( contador + 1 );

	dibujarLinea( 'green', 0, yI, xF, 300, lienzo3 );
	dibujarLinea( 'green', 300, yI, xF, 0, lienzo3 );

	contador++;

} while( contador < lineas )


function dibujarLinea( color, xInicial, yInicial, xFinal, yFinal, pad ) {

	pad.beginPath();
	pad.strokeStyle = color;
	pad.moveTo( xInicial, yInicial );
	pad.lineTo( xFinal, yFinal );
	pad.stroke();
	pad.closePath();
}