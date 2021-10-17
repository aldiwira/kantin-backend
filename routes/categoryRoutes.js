const { Router } = require('express');
const { categoryController } = require('../controller');
const { jwt, permission } = require('../helper');

const route = Router();

route.get('/', categoryController.categoryGet);
route.post('/', categoryController.categoryPost);
route.put('/:_id/edit', categoryController.categoryPut);
route.delete('/:_id/delete', categoryController.categoryDelete);

module.exports = route;
