const multer = require('multer')
const path = require("path")

const imageStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image file with max size 1 MB'))
    }
    cb(undefined, true)
  }
})


module.exports = { imageUpload, imageStorage }
