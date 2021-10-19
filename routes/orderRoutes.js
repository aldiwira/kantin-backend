const { Router } = require('express');
const { orderController } = require('../controller');

const route = Router();

route.get('/', orderController.orderGet);
route.post('/', orderController.orderPost);
// route.put('/:_id/edit', orderController.orderPost);
// route.delete('/:_id', orderController.orderDelete);

module.exports = route;
