const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>{

    if(!req.cookies.acess)
        res.redirect("/welcome");
    else if(req.session.user)
        res.render("home", {login: "false"});
    else if(req.session.error){
        delete req.session.error;
        if(req.session.user)
            res.render("home", {login: "false"}, {error: "Você precisa estar logado para acessar essa opção"});
        else
            res.render("home", {error: "Você precisa estar logado para acessar essa opção"});
    }
    else{
        res.render("home");
    }
});


router.get("/welcome", (req, res) =>{
    if(req.cookies.acess){
        res.redirect("/");
    }else{
        res.cookie("acess", "acess-true");
        if(req.session.user){
            res.render("welcome", {login: "false"});
        }else{
            res.render("welcome");
        }
    }
});


router.get('/login', (req, res) =>{
    res.render('login');

});

router.post('/login', (req, res)=>{
    let { username, password } = req.body;
    if(process.env.USER_USERNAME === username&&process.env.USER_PASSWORD === password){
        req.session.user = process.env.USER_USERNAME;
        res.redirect("/");
    }else{
        res.render("login", {error: "Usuário ou senha incorretos"});
    }   

});

router.get("/create", (req, res) =>{
    if(req.session.user){
        res.render('create');
    }else{
        req.session.error = true;
        res.redirect("/")
    }
});

router.get("/logout", (req, res) =>{
    delete req.session.user;
    res.redirect("/");
});


module.exports = router;