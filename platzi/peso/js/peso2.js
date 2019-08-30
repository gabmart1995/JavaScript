var peso =  parseInt( prompt( 'Cual es tu peso??' ) );
var planeta =  parseInt( prompt( 'Elige tu planeta.\n1.- es Marte,\n2.- es Jupiter' ) );
var g_tierra = 9.8;
var g_marte = 3.7;
var g_jupiter = 24.8;
var pesoFinal = 0;
var nombrePlaneta = '';

if ( planeta == 1 ) {

	pesoFinal = peso * g_marte / g_tierra;
	nombrePlaneta = 'Marte';
} 

else if ( planeta == 2 ) {

	pesoFinal = peso * g_jupiter / g_tierra;
	nombrePlaneta = 'Jupiter';
}

else {

	pesoFinal = 1000000;
	nombrePlaneta = 'Kripton';
}

pesoFinal = parseInt( pesoFinal );

document.write( `tu peso en ${ nombrePlaneta } es de <strong>${ pesoFinal } kilos</strong>` );