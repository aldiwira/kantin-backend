const userRoutes = require('./usersRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');

const routes = (app) => {
  const routes = [
    { route: '/', controller: userRoutes },
    { route: '/product', controller: productRoutes },
    { route: '/categories', controller: categoryRoutes },
  ];
  routes.map((v, i) => {
    app.use(v.route, v.controller);
  });
};

module.exports = { routes };
