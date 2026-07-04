# Data Persistence

Esta seccion, explica funcionalidades sobre el uso sin conexion de los navegadores web.
la persistencia de datos es fundamental ya que existen requerimientos que hay data que 
no debe salir del navegador pero conviene tener almacenado en algun lado.

Se podria usar localstorage pero su espacio es muy limitado, existen 2 alternativas que controlan
esa parte:

- SQLite3 Wasm: integra un ensamblador web que permite almacenar en memoria una BD SQL relacional
de sqlite3, realizando consultas sql para traer los datos

- IndexeDb: alternativa que trae los navegadores modernos, base de datos NoSQL manejandose en colleciones.
como mongoDB.

Se pueden usar directamente, estas son librerias que extienden funcionalidades de estos nucleo, con JS moderno:

- SQL.js -> SQLite3 Wasm
- Dexie.js -> Indexedb
