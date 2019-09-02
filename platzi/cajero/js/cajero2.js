class Billete {

	constructor( val, can ) {

		this.cantidad = can;
		this.valor = val;
	}
}

// caja del cajero
var caja = [];
caja.push( new Billete( 100, 5 ) );
caja.push( new Billete( 50, 10 ) );
caja.push( new Billete( 20, 30 ) );
caja.push( new Billete( 10, 10 ) );
caja.push( new Billete( 5, 5 ) );

// array de billetes
var entregado = [];

var div = 0;
var papeles = 0;
var dinero = 0;
var saldoCaja = 0;

var boton = document.getElementById( 'extraer' );
var texto = document.getElementById( 'dinero' );
var resultado = document.getElementById( 'resultado' );
var saldoEl = document.getElementById( 'saldo' );

document.addEventListener( 'DOMContentLoaded', establecerSaldoCaja );
boton.addEventListener( 'click', iniciarTransaccion );

function establecerSaldoCaja() {

	for ( var sal of caja ) {

		saldoCaja = saldoCaja + ( sal.valor * sal.cantidad );
	}

	saldoEl.innerHTML = saldoCaja;
}

function iniciarTransaccion() {
	
	if ( saldoCaja > 0 ) {

		dinero = parseInt( texto.value );

		if ( ( dinero > 0 ) && ( dinero <= saldoCaja ) ) {

			for ( var b of caja ) {

				calcularOperacion( b );
			}
		}

		else {
				
			return resultado.innerHTML = 'El monto es muy alto';
		}

		calcularNuevoSaldo();
		entregarDinero();
	}

	else {

		resultado.innerHTML = 'El cajero esta cerrado';
	}
}

function calcularOperacion( billete ) {

	div = Math.floor( dinero / billete.valor );

	if ( div > billete.cantidad ) {

		papeles = billete.cantidad;
	}

	else {

		papeles = div;
	}

	entregado.push( new Billete( billete.valor, papeles ) );
	dinero =  dinero - ( billete.valor * papeles );
}

function entregarDinero() {

	resultado.innerHTML = '';

	for ( var e of entregado ) {

		if ( e.cantidad > 0 ) {

			resultado.innerHTML += `${ e.cantidad } billetes de $ ${ e.valor }<br />`;
		}
	}

	saldoEl.innerHTML = saldoCaja;

	// se vacia el array de entregados para la siguiente transaccion
	entregado = [];  
}

function calcularNuevoSaldo() {

	for ( var e of entregado ) {
		
		if ( e.cantidad > 0 ) {
			saldoCaja = saldoCaja - ( e.cantidad * e.valor );
		}
	}
}