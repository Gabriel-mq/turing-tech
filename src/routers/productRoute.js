const express = require('express'),
  router = express.Router(),
  { body } = require('express-validator')
// Solicito todas las funcionalidades del productController
const productController = require('../controllers/productController')

//Require de middlewares de ruta
const uploadProducts = require('../middlewares/multerProductsMiddleware')

//Require de middlewares de aplicación para el control del comportamiento del usuario
const adminMiddleware = require("../middlewares/adminMiddleware")

const validationScheme = [
  body('productCategory').notEmpty(),
  body('productBrand').notEmpty(),
  body('productName')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 5, max: 20 }),
  body('productDescription')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 5, max: 20 }),
  body('productDescriptionLong')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 5, max: 40 }),
  body('productPrice').notEmpty().isNumeric(),
  body('productStock').notEmpty().isNumeric(),
  body('productFees').notEmpty().isNumeric(),
  body('productDiscount').notEmpty(),
  //body("imageProduct").optional({nullable:true,checkFalsy:true}),
  body('productVisibility').notEmpty(),
  body('productImportant').notEmpty(),
]

//Index Alt
router.get('/', productController.index)

//Index
router.get('/index', productController.index)

//Creación de nuevo producto
router.get('/productAdd', adminMiddleware, productController.productAddGet)
router.post(
  '/productAdd/create',
  uploadProducts.single('imageProduct'),
  validationScheme,
  productController.productAddPost,
)

//Detalle de producto
router.get('/productDetail/:id', productController.productDetail)

//Carrito
router.get('/productCart', productController.productCart)

//Catálogo de productos
router.get('/products', productController.productos)

//Edición de producto
router.get('/productEdit/:id', adminMiddleware,productController.productEdit)
router.put(
  '/productEdit/:id',
  uploadProducts.single('imageProduct'),
  validationScheme,
  productController.productPut,
)

//Borrado de producto
router.delete('/productDetail/:id', adminMiddleware,productController.productDelete)

//Rutas de categorías de productos
router.get('/products/:productCategory', productController.productCategory)

//Búsqueda/Barra de navegación
router.get('/results', productController.search)

module.exports = router
