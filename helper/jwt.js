const jwt = require('jsonwebtoken');
const secretKey = process.env.secretkey;

module.exports = {
  JWTSign: (_id, role) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          _id,
          role,
        },
        secretKey,
        (err, key) => {
          resolve(key);
          reject(err);
        }
      );
    });
  },
  JWTAuth: (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization ? authorization.split(' ')[1] : undefined;
    if (token) {
      jwt.verify(authorization, secretKey, (err, decode) => {
        if (err) {
          throw new Error(err.message);
        } else {
          req.payload = decode;
          next();
        }
      });
    } else {
      throw new Error('Invalid Signature Token Key');
    }
  },
};
