const contentModel = require("../model/contentModel");

module.exports = async function(req, res){
        if(req.session.search){
            let search = req.session.search;
            delete req.session.search;
    
            if(req.session.user)
                res.render("home", {login: "false", contents: search.reverse()});
            else
                res.render("home", {contents: search.reverse()});
        }
        else if(req.session.user)
            res.render("home", {login: "false", contents: (await contentModel.getContents()).reverse()});
        else if(req.session.error){
            let error = req.session.error
            delete req.session.error;
            if(req.session.user)
                res.render("home", {login: "false", error: error, contents: (await contentModel.getContents()).reverse()}); // melhorar esse sistema
            else
                res.render("home", {error: error, contents: (await contentModel.getContents()).reverse()}); // melhorar esse sistema
        }
        else{
            res.render("home", {contents: (await contentModel.getContents()).reverse()});
        }
    }

