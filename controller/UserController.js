const { userModel } = require('../models');
const { response, jwt, bcrypts } = require('../helper');

module.exports = {
  loginAction: (req, res, next) => {
    const { username, password } = req.body;
    try {
      userModel
        .findOne({ username })
        .then(async (users) => {
          if (users === null) {
            res
              .status(400)
              .json(response.set(false, 'Akun anda tidak ditemukan'));
          } else {
            if (await bcrypts.compare(password, users.password)) {
              const data = {
                token: await jwt.JWTSign(users._id, users.role),
                users,
              };
              await res
                .status(200)
                .json(response.set(true, 'Berhasil melakukan login', data));
            } else {
              await res
                .status(200)
                .json(response.set(false, 'Password yang anda masukkan salah'));
            }
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      next(error);
    }
  },
  registerAction: (req, res, next) => {
    const { username, password, name, kelas, role } = req.body;
    const parseRole = role === 'admin' ? 1 : 0;
    try {
      userModel.findOne({ username }).then((users) => {
        if (users) {
          res
            .status(400)
            .json(response.set(false, `Username ${username} sudah terdaftar`));
        } else {
          userModel
            .create({
              username,
              password: bcrypts.hash(password),
              name,
              kelas,
              role: parseRole,
            })
            .then(async (datas) => {
              if (datas) {
                const data = {
                  token: await jwt.JWTSign(datas._id, datas.role),
                  users: datas,
                };
                res
                  .status(200)
                  .json(
                    response.set(true, 'Berhasil membuat account baru', data)
                  );
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
