const userRoutes = require('./usersRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const orderRoutes = require('./orderRoutes');

const routes = (app) => {
  const routes = [
    { route: '/', controller: userRoutes },
    { route: '/products', controller: productRoutes },
    { route: '/categories', controller: categoryRoutes },
    { route: '/orders', controller: orderRoutes },
  ];
  routes.map((v, i) => {
    app.use(v.route, v.controller);
  });
};

module.exports = { routes };
