
const { getAllPlayers,getPlayerTourneys ,getPlayerImage, topPlayersCategory, amountOfLadderByCategory} = require('../controller/players.controller');

const express = require('express')
const routerPlayers = express.Router();

routerPlayers.get('/players',getAllPlayers);
routerPlayers.get('/playerTourneys/:licenseNumber',getPlayerTourneys);
routerPlayers.get('/playerImage/:s3Id',getPlayerImage);
routerPlayers.get('/topPlayersCategory', topPlayersCategory);
routerPlayers.get('/amountOfPages', amountOfLadderByCategory);

module.exports = routerPlayers;