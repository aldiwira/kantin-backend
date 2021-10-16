const userController = require('./userscontroller');

const routes = (app) => {
  const routes = [{ route: '/', controller: userController }];
  routes.map((v, i) => {
    app.use(v.route, v.controller);
  });
};

module.exports = { routes };
