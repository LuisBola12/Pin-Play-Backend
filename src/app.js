import express from 'express';
import config from './config';
import routerPlayers from './routes/players.routes';
import routerTourneys from './routes/tourneys.routes';
import routerUsers from './routes/user.routes';
import morgan from 'morgan';
import cors from "cors";
import fileUpload from 'express-fileupload';
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json"
const app = express();

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

export default app;
