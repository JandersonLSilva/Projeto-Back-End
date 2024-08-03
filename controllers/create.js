const contentModel = require("../model/contentModel");
module.exports = {
    get: function(req, res){
        res.locals.errTitle = req.session.errTitle;
        delete req.session.errTitle;
        res.locals.errRoute = req.session.errRoute;
        delete req.session.errRoute;
        res.locals.errImage = req.session.errImage;
        delete req.session.errImage;
        res.locals.errText =  req.session.errText;
        delete req.session.errText;
        res.render('create', {titlePage: "Criar", action: "/create"});
    },
    post: function(req, res){
        let {title, route, image, textPage} = req.body;
        contentModel.addContent(req.id, title, route, image, textPage);
        res.redirect("/");
    }
}