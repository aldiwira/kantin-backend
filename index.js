const express = require('express');
const { routes } = require('./routes');
const { db, response } = require('./helper');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json(response.set(true, 'Connected to backend server.'));
});

routes(app);

app.use((error, req, res, next) => {
  res.status(500).json(response.set(false, error.message, false));
});

app.listen(port, () => {
  const connection = db.connection;
  connection.on('error', () => (err) => {
    throw new Error(err);
  });
  console.log(`Server running at ${port}`);
});
