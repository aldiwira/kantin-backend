const fs = require('fs')
const { productModel } = require('../models');
const { response } = require('../helper');

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) throw new Error(err)
  });
}

module.exports = {
  productGet: (req, res, next) => {
    const { _id, kategori_id } = req.query;
    let searchQuery = {};
    if (_id) {
      searchQuery = { _id };
    } else if (kategori_id) {
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
              .json(response.set(false, 'data yang dicari tidak ditemukan'));
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
    const { name, stock, price, kategori_id, user_id } = req.body;
    let images = ""
    try {
      if (!req.file) {
        images = "default.jpeg"
      } else {
        images = req.file.filename
      }

      await productModel
        .create({
          name,
          stock,
          price,
          images: `public/images/${images}`,
          kategori: kategori_id,
          user: user_id,
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
  productPut: async (req, res, next) => {
    const { _id } = req.params;
    const { name, stock, price, kategori_id, user_id } = req.body;
    try {
      const productM = await productModel.findOne({ _id })
      if (productM == null) {
        res
          .status(400)
          .json(response.set(false, 'Data yang dicari tidak ditemukan'));
      } else {
        if (req.file) {
          deleteFile(`uploads/${productM.images.split('/')[2]}`)
        }
        productM.name = name
        productM.stock = stock
        productM.price = price
        productM.kategori_id = kategori_id
        productM.user_id = user_id
        productM.images = !req.file ? productM.images : `public/images/${req.file.filename}`
        await productM.save().then(saved => {
          if (saved === productM) {
            res
              .status(200)
              .json(response.set(true, `Berhasil mengubah produk ${saved.name}`, saved));
          }
        })
      }
    } catch (error) {
      next(error);
    }
  },
  productDelete: (req, res, next) => {
    const { _id } = req.params;
    try {
      productModel
        .findByIdAndDelete(_id)
        .clone()
        .then((datas) => {
          if (datas == null)
            res
              .status(400)
              .json(response.set(false, 'Data yang dicari tidak ditemukan'));
          else {
            deleteFile(`uploads/${datas.images.split('/')[2]}`)
            res.status(200).json(response.set(true, `Berhasil menghapus produk ${datas.name}`))
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      next(err)
    }

  },
};
