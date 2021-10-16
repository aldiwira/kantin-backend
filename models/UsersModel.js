const Mongoose = require('mongoose');

const users = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    kelas: {
      type: String,
      require: true,
      required: true,
    },
    username: {
      type: String,
      require: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      required: true,
    },
    role: {
      type: Number,
      require: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = Mongoose.model('users', users);
