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
      .populate('user', '_id username kelas')
      .populate({
        path: 'items',
        select: 'product jumlah',
        populate: { path: 'product', select: 'name stock price' },
      })
      .then((datas) => {
        if (id || user_id) {
          if (datas) {
            res
              .status(200)
              .json(response.set(true, 'Berhasil menampilkan data', datas));
          } else {
            res
              .status(400)
              .json(response.set(false, 'Data yang dicari tidak ditemukan'));
          }
        } else {
          res
            .status(200)
            .json(response.set(true, 'Berhasil menampilkan data', datas));
        }
      });
  },
  orderPost: async (req, res, next) => {
    // items as array
    const { user_id, method, total, items } = req.body;
    try {
      const order = await orderModel.create({
        user: user_id,
        method,
        total: total,
        status: true
      });
      await order.save();
      await items.map(async (datas, i) => {
        const temp_datas = typeof datas === "object" ? datas : JSON.parse(datas);
        const { product_id, quantity } = temp_datas;
        const detail = await detailOrderModel.create({
          product: product_id,
          order_id: order._id,
          jumlah: quantity,
        });
        await changeStock(product_id, quantity);
        const temp_order = await orderModel.findById({ _id: order._id });
        temp_order.items.push(detail);
        await temp_order.save();
      });

      orderModel
        .find({ _id: order._id })
        .populate('user', '_id username kelas')
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
  orderChangeStatus: async (req, res, next) => {
    const { _id } = req.params;
    await orderModel.findByIdAndUpdate(_id, { status: false })
      .clone()
      .populate('user', '_id username')
      .populate({
        path: 'items',
        select: 'product jumlah',
        populate: { path: 'product', select: 'name stock price' },
      })
      .exec((err, orders) => {
        res
          .status(200)
          .json(response.set(true, 'Berhasil mengubah status', orders));
      });
  },
  orderPut: (req, res, next) => { },
  orderDelete: async (req, res, next) => { },
};
