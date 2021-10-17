const { Router } = require('express');
const { productController } = require('../controller');
const { jwt, permission } = require('../helper');

const route = Router();

route.get(
  '/',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_OR_USER),
  productController.productGet
);
route.post(
  '/',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  productController.productPost
);
route.put(
  '/:_id/edit',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  productController.productPut
);
route.delete(
  '/:_id/delete',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  productController.productDelete
);

module.exports = route;
