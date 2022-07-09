const express = require('express');
const routerPlayers = require('./routes/players.routes');
const routerTourneys = require('./routes/tourneys.routes');
const routerUsers = require('./routes/user.routes');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const app = express();
const config = require('./config');

//Settings
app.set('port',config.port);

//Middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use("/docs",swaggerUI.serve, swaggerUI.setup(swaggerFile))

// Routes
app.use(routerPlayers);
app.use(routerTourneys);
app.use(routerUsers);

module.exports = app;
 