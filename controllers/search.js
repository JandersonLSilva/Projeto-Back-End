const contentModel = require("../model/contentModel");
module.exports = async function(req, res){
        let query  = req.query.q;
        if(query !== ""){    
            let contentsSearch = await contentModel.searchContent(query)
            req.session.search = contentsSearch;
        }else
            req.session.errSearch = "Não foi possível buscar esse valor, por favor tente um valor válido";
        res.redirect('/');
    };
