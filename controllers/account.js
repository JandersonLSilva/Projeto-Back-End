const contentModel = require("../model/contentModel");

module.exports = {
    loginGet: function(req, res){
        res.render('login');
    },
    loginPost: function(req, res){
        let { username, password } = req.body;
        if(req.session.user)
            res.render("login", {error: "Você já está logado"});
        else if(
            process.env.USER_USERNAME === username&&
            process.env.USER_PASSWORD === password
        ){
            req.session.user = process.env.USER_USERNAME;
            res.redirect("/");
        }else
            res.render("login", {error: "Usuário ou senha incorretos"}); 
    },

    logout: function(req, res){
        delete req.session.user;
        res.redirect("/");
    }
}