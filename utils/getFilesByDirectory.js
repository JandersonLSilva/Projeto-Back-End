const fs = require('fs').promises;
async function getFilesByDirectory(directoryPath){
    try {
        let files = await fs.readdir(directoryPath);
        return files;
    }catch (err) {
        console.error("Não foi possivél ler o diretório: ", err);
        return null;
    }
}
module.exports = getFilesByDirectory;