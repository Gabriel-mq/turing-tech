const db = require('../database/models')

function userLoggedMiddleware(req, res, next) {
  if (req.cookies.userEmail) {
    db.User.findOne({
      where: {
        user_email: req.cookies.userEmail,
      },
    }).then((userFromCookie) => {
      console.log(userFromCookie)

      if (userFromCookie) {
        req.session.userLogged = userFromCookie
      }

      if (req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
      } else {
        res.locals.isLogged = false
      }

      next()
    })
  } else {
    if (req.session.userLogged) {
      res.locals.isLogged = true
      res.locals.userLogged = req.session.userLogged
    } else {
      res.locals.isLogged = false
    }

    next()
  }
}

module.exports = userLoggedMiddleware
