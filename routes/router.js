const express = require('express');
const router = express.Router();

const contentModel = require("../model/contentModel");

// router.get("/", (req, res) =>{
//     console.log(contentModel.contents());
//     if(!req.cookies.acess)
//         res.redirect("/welcome");
//     else if(req.session.user)
//         res.render("home", {login: "false"});
//     else if(req.session.error){
//         delete req.session.error;
//         if(req.session.user)
//             res.render("home", {login: "false"}, {error: "Você precisa estar logado para acessar essa opção"}); // melhorar esse sistema
//         else
//             res.render("home", {error: "Você precisa estar logado para acessar essa opção"}); // melhorar esse sistema
//     }
//     else
//         res.render("home");
// });

// fs.writeFileSync('contents.json', "temhfjgp");
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
    // if(req.session.user){
        res.render('create');
    // }else{
    //     req.session.error = true;
    //     res.redirect("/")
    // }
});
router.post("/create", (req, res) => {
    let {title, route, image, textPage} = req.body;
    contentModel.addContent(title, route, image, textPage);
    res.redirect("/");
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


// contentModel.addContent("Java Para Iniciantes - Java do Básico ao Avançado",
//     '/javaparainiciantes',
//     'https://photos.smugmug.com/photos/i-LjCxwSN/0/Lf5p7gr4m3R9K5KXB6GnHbm6CJVqK2bvBtzFJmftQ/Ti/i-LjCxwSN-Ti.png',
//     'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.'
// )
// console.log(contentModel.contentsIsEmpty());
// contentModel.addContent("C++ Para Iniciantes - C++ do Básico ao Avançado",
//     '/cppparainiciantes',
//     'https://photos.smugmug.com/photos/i-LjCxwSN/0/Lf5p7gr4m3R9K5KXB6GnHbm6CJVqK2bvBtzFJmftQ/Ti/i-LjCxwSN-Ti.png',
//     'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.'
// )
// contentModel.addContent('','','','')
// contentModel.addContent('','','','')
// contentModel.getDateActual();
// console.log(contentModel.contents());
// console.log(contentModel.searchContent("Cpp"));





// const temp =  JSON.stringify([
//     {
//       id: 0,
//       title: 'Java Para Iniciantes - Java do Básico ao Avançado',
//       dateUp: '07/07/2024',
//       route: '/javaparainiciantes',
//       image: 'https://photos.smugmug.com/photos/i-LjCxwSN/0/Lf5p7gr4m3R9K5KXB6GnHbm6CJVqK2bvBtzFJmftQ/Ti/i-LjCxwSN-Ti.png',
//       text: 'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.\r\n' +
//         '\r\n' +
//         'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.\r\n' +
//         '\r\n' +
//         'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.\r\n' +
//         '\r\n' +
//         'Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo. Nessa página você aprendera sobre conceitos basicos de programação como tipos de dados, manipulação de arrays e strings, variáveis, operadores e estruturas de controle. Por último você verá um pouco sobre conceitos de Programação Orientada a Objetos como: Encapsulamento, herança e polimorfismo.'
//     }
//   ])+'\n';
module.exports = router;