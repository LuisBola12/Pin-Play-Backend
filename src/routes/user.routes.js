import { Router } from 'express';
import { createUser, login, recoverPassword, resetPassword } from '../controller/user.Controller';
import { validateSchema } from '../middlewares/validate.schema';
import playerSchema from '../schema/player.schema';

const routerUsers = Router();

routerUsers.post('/createUser', [validateSchema(playerSchema)], createUser)
routerUsers.post('/login', login)
routerUsers.post('/recoverPassword', recoverPassword)
routerUsers.post('/resetPassword', resetPassword)

export default routerUsers;
