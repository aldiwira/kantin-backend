const { categoryModel } = require('../models');
const { response, jwt, bcrypts } = require('../helper');

module.exports = {
  categoryGet: (req, res, next) => {
    const { _id } = req.query;
    console.log(req.payload);
    let searchQuery = {};
    if (_id != null) {
      searchQuery = { _id };
    }
    categoryModel.find(searchQuery, (err, result) => {
      res
        .status(200)
        .json(response.set(true, 'Berhasil menampilkan data', result));
    });
  },
  categoryPost: async (req, res, next) => {
    const { name } = req.body;
    await categoryModel.create({ name }, (err, data) => {
      if (err) next(err);
      res
        .status(200)
        .json(response.set(true, 'Berhasil membuat kategori baru', data));
    });
  },
  categoryPut: (req, res, next) => {
    const { _id } = req.params;
    const { name } = req.body;
    try {
      categoryModel
        .findOneAndUpdate({ _id }, { name }, (err, datas) => {
          if (err) {
            throw new Error(err);
          } else {
            if (datas == null)
              res
                .status(400)
                .json(response.set(false, 'Data yang dicari tidak ditemukan'));
            else
              res
                .status(200)
                .json(response.set(true, 'Berhasil mengubah kategori', datas));
          }
        })
        .clone();
    } catch (error) {
      next(error);
    }
  },
  categoryDelete: async (req, res, next) => {
    const { _id } = req.params;
    await categoryModel
      .findByIdAndDelete(_id, (err, datas) => {
        if (datas == null)
          res
            .status(400)
            .json(response.set(false, 'Data yang dicari tidak ditemukan'));
        else res.status(200).json(response.set(true, 'Data berhasil dihapus'));
      })
      .clone();
  },
};
