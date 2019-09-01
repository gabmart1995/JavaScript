// asignacion de variables asociativos dentro de un array
var imagenes = [];
imagenes['Cauchin'] = './../materiales/vaca.png';
imagenes['Pokacho'] = './../materiales/pollo.png';
imagenes['Tocinauro'] = './../materiales/cerdo.png';

// pakimanes
var coleccion = [];
coleccion.push( new Pakiman( 'Cauchin', 100, 30 ) );
coleccion.push( new Pakiman( 'Pokacho', 80, 50 ) );
coleccion.push( new Pakiman( 'Tocinauro', 120, 40 ) );

// nota in: trae el indice del array
// of: trae los datos dentro del array (Actualizado 2015)

for ( var pakin of coleccion ) {
	
	pakin.mostrar();
}