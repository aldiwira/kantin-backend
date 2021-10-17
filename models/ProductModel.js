const Mongoose = require('mongoose');

const product = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    kategori: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = Mongoose.model('product', product);
