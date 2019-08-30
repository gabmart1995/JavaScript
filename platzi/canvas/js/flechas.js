var cuadro = document.getElementById( 'areaDibujo' );
var papel = cuadro.getContext( '2d' );

var x = 150;
var y = 150;

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

document.addEventListener( 'keydown', dibujarTeclado );

// punto central
dibujarLinea( 'red', x - 1, y - 1, x + 1, y - 1, papel );

function dibujarTeclado( event ) {

	var colorcito = 'green';
	var movimiento = 5;

	switch ( event.keyCode ) {

		case teclas.UP:

			dibujarLinea( colorcito, x, y, x, y - movimiento, papel );
			y -= movimiento;

		break;

		case teclas.DOWN:
			
			dibujarLinea( colorcito, x, y, x, y + movimiento, papel );
			y += movimiento;

		break;

		case teclas.LEFT:
			
			dibujarLinea( colorcito, x, y, x - movimiento, y, papel );
			x -= movimiento;

		break;

		case teclas.RIGHT:
			
			dibujarLinea( colorcito, x, y, x + movimiento, y, papel );
			x += movimiento;

		break;

		default:

			console.log( 'La tecla que selecciono es incorrecta' );

		break;
	}
}

function dibujarLinea( color, xInicial, yInicial, xFinal, yFinal, lienzo ) {

	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.lineWidth = 3;
	lienzo.moveTo( xInicial, yInicial );
	lienzo.lineTo( xFinal, yFinal );
	lienzo.stroke();
	lienzo.closePath();
}