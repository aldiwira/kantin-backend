const Mongoose = require('mongoose');

const detailOrder = new Mongoose.Schema(
  {
    product: {
      type: Mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    order_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'order',
      required: true,
    },
    jumlah: {
      type: Number,
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

module.exports = Mongoose.model('detailOrder', detailOrder);
