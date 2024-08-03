const getFilesByDirectory = require("../utils/getFilesByDirectory");
const fs = require("fs");
async function getIdContent(){
    let files = await getFilesByDirectory("./data");
    let max_id = 0;

    files.forEach((file)=>{
        let id = JSON.parse(fs.readFileSync("./data/"+file, 'utf8')).id;
        max_id = Math.max(max_id, id);
    })
    return max_id;
}
const idCount = async (req, res, next)=>{
    req.id = await getIdContent();
    req.id ++;
    next();
};

module.exports = idCount;
