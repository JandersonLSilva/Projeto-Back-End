const contentModel = require("../model/contentModel");
module.exports = function(req, res){
        let id = req.params.id;
        contentModel.deleteContentById(id);
        res.redirect("/managment");
    }
