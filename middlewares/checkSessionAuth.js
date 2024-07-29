const checkSessionAuth = (req, res, next)=>{
    if(!req.session.user){
        req.session.error = "Você precisa está logado para acessar essa opção";
        console.log("auth")
        return res.redirect("/");
    }
    next();
}

module.exports = checkSessionAuth;