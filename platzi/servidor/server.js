const express = require( 'express' );
const aplicacion = express();
const functions = require( './functions' );

aplicacion.get( '/', functions.home );
aplicacion.get( '/cursos',  functions.cursos );

aplicacion.listen( 8080, functions.mensaje )
