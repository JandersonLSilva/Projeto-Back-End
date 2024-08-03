const contentModel = require("../model/contentModel");

module.exports = {
    verifyAuth : function(req, res, next){
        if(req.session.error){
            res.locals.login = undefined;
            res.locals.error = req.session.error;
            delete req.session.error;
        }else{
            res.locals.login = "logado";
        }
        next();
    },
    verifyError: function(req, res, next){
        if(req.session.errSearch){
            res.locals.error = req.session.errSearch;
            delete req.session.errSearch;
        }
        next();
    },
    prepareData : async function(req, res, next){
        try {
            res.locals.loading = (await contentModel.getContents()).reverse();
        } catch (err) {
            console.error("Erro ao carregar os dados!!", err);
        }
        next()
    },
    catchSearch : function(req, res, next){
        if(req.session.search){
            res.locals.loading = req.session.search.reverse();
            delete req.session.search;
        }
        next();
    },
    get : async function(req, res, next){
        res.render('home');
    }
}