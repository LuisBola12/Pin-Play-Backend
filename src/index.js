import app from './app';

app.listen( app.get( 'port' ) );
console.log( `Server on port http//localhost:${app.get( 'port' )}
              You can find the docs at http//localhost:${app.get( 'port' )}/docs` );