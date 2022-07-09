
const { createUser, login, recoverPassword, resetPassword } = require('../controller/user.controller');
const { validateSchema } = require('../middlewares/validate.schema');
const {playerSchema} = require('../schema/player.schema');

const express = require('express')
const routerUsers = express.Router();

routerUsers.post('/createUser', [validateSchema(playerSchema)], createUser)
routerUsers.post('/login', login)
routerUsers.post('/recoverPassword', recoverPassword)
routerUsers.post('/resetPassword', resetPassword)

module.exports = routerUsers;
