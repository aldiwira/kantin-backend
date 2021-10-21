const { Router } = require('express');
const { productController } = require('../controller');
const { multer } = require('../helper');

const route = Router();

route.get('/', productController.productGet);
route.post('/', multer.imageUpload.single("images"), productController.productPost);
route.put('/:_id/edit', multer.imageUpload.single("images"), productController.productPut);
route.delete('/:_id/delete', productController.productDelete);

module.exports = route;
