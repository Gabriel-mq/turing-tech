//El auth middleware evitará que se pueda acceder al perfil del usuario si no está logueado en el sistema

function authMiddleware(req,res,next){
    if(!req.session.userLogged){
        res.redirect("/login")
    }

    next()
}

module.exports = authMiddleware