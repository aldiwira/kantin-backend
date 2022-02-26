const { Router } = require('express');
const multer = require('multer');
const { userController } = require('../controller');
const { response, jwt, bcrypts } = require('../helper');

const route = Router();

route.post('/login', multer().none(), userController.loginAction);
route.post('/register', multer().none(), userController.registerAction);

module.exports = route;
