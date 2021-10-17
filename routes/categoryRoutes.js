const { Router } = require('express');
const { categoryController } = require('../controller');
const { jwt } = require('../helper');

const route = Router();

route.get('/', jwt.JWTAuth, categoryController.categoryGet);
route.post('/', jwt.JWTAuth, categoryController.categoryPost);
route.put('/:_id/edit', jwt.JWTAuth, categoryController.categoryPut);
route.delete('/:_id/delete', jwt.JWTAuth, categoryController.categoryDelete);

module.exports = route;
