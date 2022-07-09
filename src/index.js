const app = require('./app');

app.listen( app.get( 'port' ) );
console.log( `Server on port http//localhost:${app.get( 'port' )}
              You can find the documentation at http//localhost:${app.get( 'port' )}/docs` );