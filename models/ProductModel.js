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
    kategori: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    images: {
      type: String,
      default: "public/images/default.jpg"
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = Mongoose.model('product', product);
