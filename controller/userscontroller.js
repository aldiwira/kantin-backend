const { Router } = require('express');
const { userModel } = require('../models');
const { response, jwt, bcrypts } = require('../helper');

const route = Router();

route.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  userModel.findOne({ username }, (err, users) => {
    if (users === null) {
      res.status(400).json(response.set(false, 'Akun anda tidak ditemukan'));
    }
    if (bcrypts.compare(password, users.password)) {
      const data = {
        token: jwt.JWTSign(users._id, users.role),
        users,
      };
      res
        .status(200)
        .json(response.set(true, 'Berhasil melakukan login', data));
    } else {
      res
        .status(200)
        .json(response.set(false, 'Password yang anda masukkan salah'));
    }
  });
});

route.post('/register', async (req, res, next) => {
  const { username, password, name, kelas, role } = req.body;
  const parseRole = role === 'admin' ? 1 : 0;
  userModel.findOne({ username }, (err, users) => {
    if (users) {
      res
        .status(400)
        .json(response.set(false, `Username ${username} sudah terdaftar`));
    }
    userModel
      .create({
        username,
        password: bcrypts.hash(password),
        name,
        kelas,
        role: parseRole,
      })
      .then((result) => {
        const data = {
          token: jwt.JWTSign(result._id, result.role),
          users: result,
        };
        res
          .status(200)
          .json(response.set(true, 'Berhasil membuat account baru', data));
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
});

module.exports = route;
