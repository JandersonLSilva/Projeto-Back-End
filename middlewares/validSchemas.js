const path = require("path");
const contentSchema = require("../schemas/contentSchema");
const getFilesByDirctory = require("../utils/getFilesByDirectory");

async function existRoute(req, route){
    let routeFiles = await getFilesByDirctory("./data");
    routeFiles.forEach((file)=>{
        if(route == ('/'+path.parse(file).name)){
            req.session.errRoute.push("Já existe uma rota com esse nome, escolha outra para prosseguir");
        }
    })
}

const validSchema = async (req, res, next) => {
    const { title, route, image } = req.body;
    const text = req.body.textPage;

    const { error } = contentSchema.validate({
        title, route, image, text
    });
    if(error) {
        const errors = error.details.map(detail => ({
            path: detail.path.join('.'),
            message: detail.message
        }));
        req.session.errTitle = [];
        req.session.errRoute = [];
        req.session.errImage = [];
        req.session.errText = [];
        
        await existRoute(req, route);
        errors.forEach(err => {
            if (err.path === 'title') 
                req.session.errTitle.push(err.message);
            else if (err.path === 'route')
                req.session.errRoute.push(err.message);
            else if (err.path === 'image')
                req.session.errImage.push(err.message);
            else if (err.path === 'text')
                req.session.errText.push(err.message);
        });
        console.log(error)
        
        return res.redirect("/create");
    }

    next();
};


module.exports = validSchema;