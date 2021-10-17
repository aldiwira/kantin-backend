const yup = require('yup');
module.exports = {
  product: () =>
    yup.object().shape({
      name: yup.string().required(),
      stock: yup.number().required(),
      price: yup.number().required(),
      kategori: yup.number().required(),
    }),
};
