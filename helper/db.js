const mongoose = require('mongoose');
require('dotenv').config();

//Mongo DB Connect with URI from envelope
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.mongo_url, options).catch((err) => {
  console.log(err);
});

module.exports = mongoose;
