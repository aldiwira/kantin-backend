const Mongoose = require('mongoose');

const orders = new Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    total: {
      type: Number,
    },
    items: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'detailOrder',
        required: true,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = Mongoose.model('order', orders);
