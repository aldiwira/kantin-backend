const { productModel } = require('../models');
const { response } = require('../helper');

module.exports = {
  productGet: (req, res, next) => {
    const { _id, kategori_id } = req.query;
    let searchQuery = {};
    if (_id != null) {
      searchQuery = { _id };
    } else if (kategori_id != null) {
      searchQuery = { kategori: kategori_id };
    }
    try {
      productModel
        .find(searchQuery)
        .populate('kategori', '_id, name')
        .populate('user', '_id, username')
        .select('name stock price kategori user')
        .then((result) => {
          if (result != null && result.length != 0) {
            res
              .status(200)
              .json(response.set(true, 'Berhasil menampilkan data', result));
          } else {
            res
              .status(400)
              .json(
                response.set(false, 'data yang dicari tidak ditemukan', result)
              );
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      next(error);
    }
  },
  productPost: async (req, res, next) => {
    const { name, stock, price, kategori_id } = req.body;
    try {
      await productModel
        .create({
          name,
          stock,
          price,
          kategori: kategori_id,
          user: req.payload._id,
        })
        .then((datas) => {
          res
            .status(200)
            .json(response.set(true, 'Berhasil membuat produk baru', datas));
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err);
          return;
        });
    } catch (error) {
      next(error);
    }
  },
  productPut: (req, res, next) => {
    const { _id } = req.params;
    const { name, stock, price, id_kategori } = req.body;
    try {
      productModel
        .findOneAndUpdate(
          { _id },
          { name, stock, price, kategori: id_kategori, user: req.payload._id }
        )
        .clone()
        .then((datas) => {
          if (datas == null)
            res
              .status(400)
              .json(response.set(false, 'Data yang dicari tidak ditemukan'));
          else
            res
              .status(200)
              .json(response.set(true, 'Berhasil mengubah produk', datas));
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      next(error);
    }
  },
  productDelete: (req, res, next) => {
    const { _id } = req.params;
    productModel
      .findByIdAndDelete(_id)
      .clone()
      .then((datas) => {
        if (datas == null)
          res
            .status(400)
            .json(response.set(false, 'Data yang dicari tidak ditemukan'));
        else res.status(200).json(response.set(true, 'Data berhasil dihapus'));
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
