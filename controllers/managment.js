const contentModel = require("../model/contentModel");
module.exports = async function(req, res){
        res.render("managment", {content: (await contentModel.getContents())});
    }