const { categoryModel } = require('../models');
const { response } = require('../helper');

module.exports = {
  categoryGet: (req, res, next) => {
    const { _id } = req.query;
    let searchQuery = {};
    if (_id != null) {
      searchQuery = { _id };
    }
    categoryModel.find(searchQuery).then((result) => {
      if (result) {
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
    });
  },
  categoryPost: async (req, res, next) => {
    const { name, status } = req.body;
    await categoryModel
      .create({ name, status })
      .then((datas) => {
        res
          .status(200)
          .json(response.set(true, 'Berhasil membuat kategori baru', datas));
      })
      .catch((err) => {
        if (err) next(err);
      });
  },
  categoryPut: (req, res, next) => {
    const { _id } = req.params;
    const { name, status } = req.body;
    try {
      categoryModel
        .findOneAndUpdate({ _id }, { name, status })
        .clone()
        .then((datas) => {
          if (datas == null)
            res
              .status(400)
              .json(response.set(false, 'Data yang dicari tidak ditemukan'));
          else
            res
              .status(200)
              .json(response.set(true, 'Berhasil mengubah kategori', datas));
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      next(error);
    }
  },
  categoryDelete: async (req, res, next) => {
    const { _id } = req.params;
    await categoryModel
      .findByIdAndDelete(_id)
      .clone()
      .then((datas) => {
        if (datas == null)
          res
            .status(400)
            .json(response.set(false, 'Data yang dicari tidak ditemukan'));
        else res.status(200).json(response.set(true, 'Data berhasil dihapus'));
      });
  },
};
