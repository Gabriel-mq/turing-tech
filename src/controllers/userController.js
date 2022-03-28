const db = require('../database/models'),
  { validationResult } = require('express-validator'),
  bcryptjs = require('bcryptjs'),
  fs = require('fs'),
  path = require('path')

const userController = {
  ayuda: (req, res) => {
    res.render('users/ayuda')
  },
  registerGet: (req, res) => {
    let localities = db.Locality.findAll(),
      provinces = db.Province.findAll(),
      roles = db.Rol.findAll()

    Promise.all([localities, provinces, roles]).then(
      ([localities, provinces, roles]) => {
        res.render('users/register', { localities, provinces, roles })
      },
    )
  },
  registerPost: (req, res) => {
    //Imágen y carga de datos
    let image

    if (req.file) {
      image = req.file.filename
    } else {
      image = 'default-image.png'
    }

    //Validaciones correspondientes
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      db.User.create({
        user_fullname: req.body.registroFullname,
        user_nickname: req.body.registroUsuario,
        user_email: req.body.registroEmail,
        user_dni: req.body.registroDni,
        user_cellphone: req.body.registroTel,
        user_lock: bcryptjs.hashSync(req.body.registroLock, 10),
        user_lockrepeat: bcryptjs.hashSync(req.body.registroLockRepeat, 10),
        imageUser: image,
        rol_id: req.body.registroRol,
        administrator: false,
      })

      db.Adress.create({
        fiscal_adress: req.body.registroDir,
        department: req.body.registroDepto,
        postal_code: req.body.registroPostal,
        locality: req.body.registroLocality,
        user_province: req.body.registroProvince,
      }).then(() => {
        res.redirect('/pageProfile')
      })
    } else {
      let localities = db.Locality.findAll(),
        provinces = db.Province.findAll(),
        roles = db.Rol.findAll()

      Promise.all([localities, provinces, roles]).then(
        ([localities, provinces, roles]) => {
          res.render('users/register', {
            localities,
            provinces,
            roles,
            errors: errors.mapped(),
            old: req.body,
          })
        },
      )
    }
  },
  restablecer: (req, res) => {
    res.render('users/restablecer')
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let errors = validationResult(req)
    console.log(errors)
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          user_email: req.body.userEmail,
        },
      })
        .then((userToLogin) => {
          if (userToLogin) {
            let comparePassword = bcryptjs.compareSync(
              req.body.userLock,
              userToLogin.user_lock,
            )

            if (comparePassword) {
              delete userToLogin.userLock
              delete userToLogin.userLockRepeat
              req.session.userLogged = userToLogin

              if (req.body.remember) {
                res.cookie('userEmail', req.body.userEmail, {
                  maxAge: 1000 * 60,
                })
              }
              return res.redirect('/pageProfile')
            }
          } else {
            return res.render('users/login', {
              errorLogin:
                'El usuario o contraseña no existen en nuestra base de datos o están vacíos',
            })
          }
        })
        .catch(() => {})
    } else {
      return res.render('users/login', {
        errors: errors.mapped(),
        old: req.body,
      })
    }
  },
  logout: (req, res) => {
    res.clearCookie('userEmail')
    req.session.destroy()
    return res.redirect('/')
  },
  pageProfile: (req, res) => {
    console.log(req.session.userLogged)
    let provinces = db.Province.findAll(),
      localities = db.Locality.findAll()
    adress = db.Adress.findOne({
      where: {
        id: req.session.userLogged.id,
      },
    })

    console.log(adress)

    Promise.all([provinces, localities, adress]).then(
      ([provinces, localities, adress]) => {
        res.render('users/pageProfile', {
          userLogged: req.session.userLogged,
          provinces,
          localities,
          adress,
        })
      },
    )
  },
  pageProfilePost: (req, res) => {
    let image

    if (req.file) {
      image = req.file.filename
      if (
        req.session.userLogged &&
        req.session.userLogged.imageUser !== 'default-image.png'
      ) {
        fs.unlinkSync(
          path.resolve(
            __dirname,
            `../../public/images/users-assets/${req.session.userLogged.imageUser}`,
          ),
        )
        req.session.userLogged.imageUser = image
      }
    } else {
      db.User.findOne({
        where: {
          id: req.session.userLogged.id,
        },
      }).then((user) => {
        image = user.imageUser
      })
    }

    db.User.update(
      {
        user_fullname: req.body.user_fullname,
        user_nickname: req.body.user_nickname,
        user_email: req.body.user_email,
        user_dni: req.body.user_dni,
        user_cellphone: req.body.user_cellphone,
        imageUser: image,
      },
      {
        where: {
          id: req.session.userLogged.id,
        },
      },
    )

    db.Adress.update(
      {
        fiscal_adress: req.body.fiscal_adress,
        department: req.body.department,
        postal_code: req.body.postal_code,
        locality: req.body.locality,
        user_province: req.body.user_province,
      },
      {
        where: {
          id: req.session.userLogged.id,
        },
      },
    ).then(() => {
      res.redirect('/pageProfile')
    })
  },
}

module.exports = userController
