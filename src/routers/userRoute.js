const express = require('express'),
  router = express.Router()

// Solicito todas las funcionalidades del userController
const userController = require('../controllers/userController')

//Require de middlewares de ruta
const uploadUsers = require('../middlewares/multerUsersMiddleware')

//Require y uso de express-validator
const { body } = require('express-validator')

//Require de middlewares de aplicación para el control del comportamiento del usuario
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

const validationScheme = [
  body('registroFullname').notEmpty().isString(),
  body('registroUsuario')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 1, max: 20 }),
  body('registroEmail').notEmpty().isEmail(),
  body('registroDni').notEmpty().isNumeric().isLength({ min: 8, max: 8 }),
  body('registroTel').notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
  body('registroDir').notEmpty().isAlphanumeric('es-ES', { ignore: 's' }),
  body('registroDepto')
    .isAlphanumeric('es-ES', { ignore: 's' })
    .optional({ nullable: true, checkFalsy: true }),
  body('registroPostal').notEmpty().isAlphanumeric('es-ES', { ignore: 's' }),
  body('registroLocality').notEmpty().isString().isLength({ min: 1, max: 30 }),
  body('registroProvince').notEmpty().isString().isLength({ min: 1, max: 30 }),
  body('registroLock')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 8, max: 30 }),
  body('registroLockRepeat')
    .notEmpty()
    .isAlphanumeric('es-ES', { ignore: 's' })
    .isLength({ min: 8, max: 30 }),
  body('registroAvatar').optional({ nullable: true, checkFalsy: true }),
  body('registroRol').notEmpty(),
]

const validationSchemeLogin = [
  body('userEmail').notEmpty().isEmail(),
  body('userLock').notEmpty().isAlphanumeric('es-ES', { ignore: 's' }),
]

/* Con readAll - LISTADO DE PRODUCTOS, RENDERIZA CATALOGO DE PRODUCTOS*/
//Ayuda
router.get('/ayuda', userController.ayuda)

//Login
router.get('/login', guestMiddleware, userController.loginGet)
router.post('/login', validationSchemeLogin, userController.loginPost)

//Logout
router.get('/out', userController.logout)

//Registro
router.get('/register', guestMiddleware, userController.registerGet)
router.post(
  '/register',
  uploadUsers.single('registroAvatar'),
  validationScheme,
  userController.registerPost,
)

//Restablecer
router.get('/restablecer', userController.restablecer)

//pageProfile
router.get('/pageProfile', authMiddleware, userController.pageProfile)
router.put(
  '/pageProfile',
  uploadUsers.single('imageUser'),
  userController.pageProfilePost,
)

//presentacion
router.get('/presentacion',userController.presentacion);

module.exports = router
