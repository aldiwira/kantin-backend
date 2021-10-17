const { Router } = require('express');
const { categoryController } = require('../controller');
const { jwt, permission } = require('../helper');

const route = Router();

route.get(
  '/',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_OR_USER),
  categoryController.categoryGet
);
route.post(
  '/',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  categoryController.categoryPost
);
route.put(
  '/:_id/edit',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  categoryController.categoryPut
);
route.delete(
  '/:_id/delete',
  jwt.JWTAuth,
  permission.check(permission.rules.ADMIN_ONLY),
  categoryController.categoryDelete
);

module.exports = route;
