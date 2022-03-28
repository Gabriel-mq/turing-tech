//El admin middleware evitará que usuarios comunes puedan acceder a secciones solo administrativas  

function adminMiddleware(req,res,next){
    if(!req.session.userLogged){
        res.redirect("/")
    }

    if(req.session.userLogged.administrator !== true){
        res.redirect("/")
    }

    next()
}

module.exports = adminMiddleware