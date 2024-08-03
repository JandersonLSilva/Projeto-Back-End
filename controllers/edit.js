const contentModel = require("../model/contentModel");
module.exports = {
    get: async function(req, res){
        let id = req.params.id;
        res.render('create', {
            titlePage: "Editar",
            action: "/edit/"+id,
            title: (await contentModel.getContentById(id)).title,
            image: (await contentModel.getContentById(id)).image,
            text: (await contentModel.getContentById(id)).text
        })
    },
    post: async function(req, res){
        let { id } = req.params;
        let { title, image, textPage } = req.body;
        await contentModel.editContentById(id, title, image, textPage);
        res.redirect("/managment");
    }
}