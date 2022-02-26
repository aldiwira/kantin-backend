const { Router } = require('express');
const multer = require('multer');
const { categoryController } = require('../controller');
const { jwt, permission } = require('../helper');

const route = Router();

route.get('/', categoryController.categoryGet);
route.post('/', multer().none(),categoryController.categoryPost);
route.put('/:_id/edit', multer().none(),categoryController.categoryPut);
route.delete('/:_id/delete', categoryController.categoryDelete);

module.exports = route;
