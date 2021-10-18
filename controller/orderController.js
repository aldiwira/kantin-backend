const { detailOrderModel, orderModel, productModel } = require('../models');
const { response } = require('../helper');

const changeStock = async (product_id, afterstock) => {
  const productData = await productModel.findById({ _id: product_id });
  productData.stock = productData.stock - afterstock;
  await productData.save();
};

module.exports = {
  orderGet: async (req, res, next) => {
    const { id, user_id } = req.query;
    let searchQuery = {};
    if (id) {
      searchQuery = { _id: id };
    } else if (user_id) {
      searchQuery = { user: user_id };
    }
    await orderModel
      .find(searchQuery)
      .populate('user', '_id username')
      .populate({
        path: 'items',
        select: 'product jumlah',
        populate: { path: 'product', select: 'name stock price' },
      })
      .then((datas) => {
        if (datas != null && datas.length != 0) {
          res
            .status(200)
            .json(response.set(true, 'Berhasil membuat data baru', datas));
        } else {
          res
            .status(400)
            .json(response.set(false, 'data yang dicari tidak ditemukan'));
        }
      });
  },
  orderPost: async (req, res, next) => {
    // items as array
    const { user_id, method, items } = req.body;
    try {
      const order = await orderModel.create({
        user: user_id,
        method,
        total: items.length,
      });
      await order.save();
      await items.map(async (datas, i) => {
        const { item_id, jumlah } = datas;
        const detail = await detailOrderModel.create({
          product: item_id,
          order_id: order._id,
          jumlah,
        });
        await changeStock(item_id, jumlah);
        const temp_order = await orderModel.findById({ _id: order._id });
        temp_order.items.push(detail);
        await temp_order.save();
      });

      await orderModel
        .find({ _id: order._id })
        .populate('user', '_id username')
        .populate({
          path: 'items',
          select: 'product jumlah',
          populate: { path: 'product', select: 'name stock price' },
        })
        .exec((err, orders) => {
          res
            .status(200)
            .json(response.set(true, 'Berhasil membuat data baru', orders));
        });
    } catch (err) {
      next(err);
    }
  },
  orderPut: (req, res, next) => {},
  orderDelete: (req, res, next) => {},
};
