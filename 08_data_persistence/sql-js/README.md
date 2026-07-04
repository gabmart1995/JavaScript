# SQL JS

es una libreria que gestiona los datos mediante instrucciones SQL,
tiene un wasm de sqlite3 que gestiona los datos en memoria, una
alternativa real.

- Facil uso y configuracion 
- Uso de workers para gestionar la carga de consultas

## Problemas

- La base de datos se encuentra en memoria, no posee registro persistente.
debe manejarse la importacion y exportacion manualmente, mediante archivos.

### Casos de uso reales
- Creacion de sistema de guardado para cargado de progreso para juegos o
configuraciones iniciales de una app, que requiera una gran cantidad de datos
separados que deben ser gestionados localmente por el usuario.

- Sistema de sincronizaciones de internet en caso de no tener conexion remota.
o zonas de dificil acceso
