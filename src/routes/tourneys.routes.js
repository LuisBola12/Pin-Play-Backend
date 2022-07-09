import { Router } from 'express';
import { getCategories, addTournament, getTournaments, getPageCount } from '../controller/tournaments.controller';
import { checkAuth } from '../middlewares/auth';
import tournamentsSchema from '../schema/tournaments.schema';
import { validateSchema } from '../middlewares/validate.schema';

const routerTourneys = Router();

routerTourneys.post('/tournaments',[validateSchema(tournamentsSchema), checkAuth], addTournament);
routerTourneys.get('/categories', getCategories);
routerTourneys.get('/getTournaments', getTournaments);
routerTourneys.get('/getTournamentPages', getPageCount);


export default routerTourneys;
