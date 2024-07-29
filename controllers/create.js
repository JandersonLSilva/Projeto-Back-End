const contentModel = require("../model/contentModel");
module.exports = {
    get: function(req, res){
        res.render('create', {titlePage: "Criar", action: "/create"});
    },
    post: function(req, res){
        let {title, route, image, textPage} = req.body;
        contentModel.addContent(req.id, title, route, image, textPage);
        res.redirect("/");
    }
}