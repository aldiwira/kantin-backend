const { userModel } = require('../models');
const response = require('./response');
const rule = {
  ADMIN_ONLY: 'admin',
  ADMIN_OR_USER: 'global',
};
module.exports = {
  rules: rule,
  check: (rules) => async (req, res, next) => {
    const { _id } = req.payload;
    await userModel
      .findById(_id)
      .clone()
      .then((datas) => {
        if (rule.ADMIN_ONLY == rules) {
          if (datas.role) next();
          else res.status(400).json(response.set(false, 'Permission Denied'));
        } else if (rule.ADMIN_OR_USER == rules) {
          next();
        }
      });
  },
};
