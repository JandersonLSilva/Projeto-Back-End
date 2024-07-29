const contentModel = require("../model/contentModel");
module.exports = async function(req, res){
        let query  = req.query.q;
        if(query !== ""){    
            let contentsSearch = await contentModel.searchContent(query)
            req.session.search = contentsSearch;
        }else
            console.log("Não é possivel buscar esse valor!!!");
        res.redirect('/');
    };
