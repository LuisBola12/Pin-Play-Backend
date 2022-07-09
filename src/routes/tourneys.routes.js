
const { getCategories, addTournament, getTournaments, getPageCount } = require('../controller/tournaments.controller');
const { checkAuth } =  require('../middlewares/auth');
const tournamentsSchema =  require('../schema/tournaments.schema');
const { validateSchema } =  require('../middlewares/validate.schema');

const express = require('express')
const routerTourneys = express.Router();

routerTourneys.post('/tournaments',[validateSchema(tournamentsSchema), checkAuth], addTournament);
routerTourneys.get('/categories', getCategories);
routerTourneys.get('/getTournaments', getTournaments);
routerTourneys.get('/getTournamentPages', getPageCount);


module.exports =  routerTourneys;
