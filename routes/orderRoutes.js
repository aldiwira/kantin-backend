const { Router } = require('express');
const multer = require('multer');
const { orderController } = require('../controller');

const route = Router();

route.get('/', orderController.orderGet);
route.post('/', multer().none(), orderController.orderPost);
route.post('/:_id/changestatus', multer().none(), orderController.orderChangeStatus);
// route.put('/:_id/edit', orderController.orderPost);
// route.delete('/:_id', orderController.orderDelete);

module.exports = route;
