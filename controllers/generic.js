const fs = require('fs');
const contentModel = require("../model/contentModel");
module.exports = function(req, res){
    let route = req.params.route;
    let content = JSON.parse(fs.readFileSync('./data/'+route+'.json'));
    if(req.session.user){
        res.render("generic", {login: "false", title: content.title, text: content.text, image: content.image});
    }else
        res.render("generic", {title: content.title, text: content.text, image: content.image});
}
