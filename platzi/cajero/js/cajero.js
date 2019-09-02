class Billete {

	constructor( valor, cantidad ) {

		this.valor = valor;
		this.cantidad = cantidad;
	}
}

var caja = [];
caja.push( new Billete( 100, 5 ) );
caja.push( new Billete( 50, 10 ) );
caja.push( new Billete( 20, 30 ) );
caja.push( new Billete( 10, 10 ) );
caja.push( new Billete( 5, 5 ) );

var entregado = [];

var div = 0;
var papeles = 0;
var dinero = 0;

var boton = document.getElementById( 'extraer' );
var texto = document.getElementById( 'dinero' );
var resultado = document.getElementById( 'resultado' );

boton.addEventListener( 'click', iniciarTransaccion );

function iniciarTransaccion() {

	dinero = parseInt( texto.value );

	for ( var b of caja ) {

		if ( dinero > 0 ) {

			calcularOperacion( b );

			entregado.push( new Billete( b.valor , papeles ) );
			dinero =  dinero - ( b.valor * papeles );
		}
	}

	// muestra el mensaje
	entregarDinero();
}

function calcularOperacion( billete ) {

	div = Math.floor( dinero / billete.valor );

	if ( div > billete.cantidad ) {

		papeles = billete.cantidad;
	}

	else {

		papeles = div;
	}
}

function entregarDinero() {

	if ( dinero > 0 ) {

		resultado.innerHTML = 'Soy un cajero malo no puedo darle la cantidad';
	}

	else {
		
		for ( var e of entregado ) {

			if ( e.cantidad > 0 ) {
				resultado.innerHTML += `${ e.cantidad } billetes de $ ${ e.valor }<br />`;
			}
		}
	}
}