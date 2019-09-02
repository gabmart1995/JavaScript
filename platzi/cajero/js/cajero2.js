class Billete {

	constructor( val, can ) {

		this.cantidad = can;
		this.valor = val;
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
var saldoCaja = 0;

var boton = document.getElementById( 'extraer' );
var texto = document.getElementById( 'dinero' );
var resultado = document.getElementById( 'resultado' );
var saldoEl = document.getElementById( 'saldo' );

document.addEventListener( 'DOMContentLoaded', establecerSaldo );
boton.addEventListener( 'click', iniciarTransaccion );

function establecerSaldo() {

	for ( var sal of caja ) {

		saldoCaja = saldoCaja + ( sal.valor * sal.cantidad );
	}

	saldoEl.innerHTML = `saldo del cajero: ${ saldoCaja }$ <br />`;
	console.log( saldoEl );
}

function iniciarTransaccion() {
	
}