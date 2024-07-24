const express = require('express');
const router = express.Router();

const contentModel = require("../model/contentModel");
const { render } = require('../app');

router.get("/", (req, res) =>{

    if(!req.cookies.acess)
        res.redirect("/welcome");
    else if(req.session.user)
        res.render("home", {login: "false", contents: contentModel.getContents().reverse()});
    else if(req.session.error){
        delete req.session.error;
        if(req.session.user)
            res.render("home", {login: "false"}, {error: "Você precisa estar logado para acessar essa opção", contents: contentModel.getContents().reverse()}); // melhorar esse sistema
        else
            res.render("home", {error: "Você precisa estar logado para acessar essa opção", contents: contentModel.getContents().reverse()}); // melhorar esse sistema
    }
    else{
        // console.log(contentModel.getContents().reverse());
        res.render("home", {contents: contentModel.getContents().reverse()});
    }
});



router.get("/welcome", (req, res) =>{
    if(false){ //req.cookies.acess
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
        res.render("login", {error: "Usuário ou senha incorretos"}); // lebrar de tratar erro já está logado
    }   

});



router.get("/create", (req, res) =>{
    if(req.session.user){
        res.render('create', {titlePage: "Criar", action: "/create"});
    }else{
        req.session.error = true;
        res.redirect("/")
    }
});
router.post("/create", (req, res) => {
    let {title, route, image, textPage} = req.body;
    contentModel.addContent(title, route, image, textPage);
    res.redirect("Referer");
});


router.get("/logout", (req, res) =>{ // obs.: tratar possiveis erros
    delete req.session.user;
    res.redirect("/");
});

 
contentModel.getContents().forEach(content => {
    router.get(content.route, (req, res) =>{  // possivel maneira de acessar as paginas  // cogitar colocar um caminho antes
        if(req.session.user){
            res.render("generic", {login: "false", title: content.title, text: content.text, image: content.image});
        }else{
            res.render("generic", {title: content.title, text: content.text, image: content.image});
        }
    });
});


router.get("/managment", (req, res) => {
    if(req.session.user){
        res.render("managment", {content: contentModel.getContents()});
    }else
        res.redirect("/"); /* lembrar de tratar o erro corretamente */
});

router.get("/delete/:id", (req, res) => {
    let { id } = req.params;
    if(req.session.user){
        contentModel.deleteContentById(id);
    }
    let previousPage = req.get('Referer');
    res.redirect(previousPage); /* lembrar de tratar o erro corretamente */
});

router.get("/edit/:id", (req, res) => {
    let { id } = req.params;
    if(req.session.user){
        res.render('create', {
            titlePage: "Editar",
            action: "/edit/"+id,
            title: contentModel.getContentById(id).title, 
            route: contentModel.getContentById(id).route,
            image: contentModel.getContentById(id).image,
            text: contentModel.getContentById(id).text
        })
    }
    else{
        res.send("Voçê precisa está logado primeiro")
    }
});

router.post("/edit/:id", (req, res) =>{
    let { id } = req.params;
    let { title, route, image, textPage } = req.body;
    contentModel.editContentById(id, title, route, image, textPage);
    res.redirect("/managment");
});

module.exports = router;