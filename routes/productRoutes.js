const { Router } = require('express');
const { productController } = require('../controller');
const { jwt, permission } = require('../helper');

const route = Router();

route.get('/', productController.productGet);
route.post('/', productController.productPost);
route.put('/:_id/edit', productController.productPut);
route.delete('/:_id/delete', productController.productDelete);

module.exports = route;
