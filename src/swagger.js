const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'API PinPlay',
        description: 'Esta API se encarag de responde los llamados del frontend de la aplicación PinPlay y responder con la información resguardada en la base de datos PinPlay.',
        version: '1.0.0',
    },
    host: "localhost:4000",
    schemes: ["http","https"],
}
const outputfile = "./swagger.json";
const endpointFiles = ["./app.js"];
swaggerAutogen(outputfile,endpointFiles,doc).then(()=>{
    require("./app.js");
})
