import { Router } from 'express';
import { getAllPlayers,getPlayerTourneys ,getPlayerImage, topPlayersCategory, amountOfLadderByCategory} from '../controller/players.controller';

const routerPlayers = Router();

routerPlayers.get('/players',getAllPlayers);
routerPlayers.get('/playerTourneys/:licenseNumber',getPlayerTourneys);
routerPlayers.get('/playerImage/:s3Id',getPlayerImage);
routerPlayers.get('/topPlayersCategory', topPlayersCategory);
routerPlayers.get('/amountOfPages', amountOfLadderByCategory);

export default routerPlayers;