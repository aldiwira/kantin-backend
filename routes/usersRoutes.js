const { Router } = require('express');
const { userController } = require('../controller');
const { response, jwt, bcrypts } = require('../helper');

const route = Router();

route.post('/login', userController.loginAction);

route.post('/register', userController.registerAction);

module.exports = route;
