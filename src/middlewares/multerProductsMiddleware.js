const multer = require('multer'),
  path = require('path')

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

const fileFilter = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(null, false, new Error('Tipo de archivo inválido'))
  }
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.resolve(__dirname, '../../public/images/productos-assets')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    let imageName = Date.now() + '-' + file.originalname
    cb(null, imageName)
  },
})

const uploadProducts = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5048576,
  },
})

module.exports = uploadProducts
