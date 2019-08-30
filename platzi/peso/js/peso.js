var usuario = prompt( 'Cual es tu peso??' );
var peso = parseInt( usuario );
var g_tierra = 9.8;
var g_marte = 3.7;
var g_jupiter = 24.8;
var pesoFinal;

pesoFinal = peso * g_marte / g_tierra;

document.write( `tu peso en marte es de <strong>${ parseInt( pesoFinal ) } kilos</strong>` );