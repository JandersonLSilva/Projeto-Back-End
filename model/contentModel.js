const fs = require('fs');
const getDateActual = require("../utils/getDateActual");
const getFilesByDirectory = require("../utils/getFilesByDirectory")
module.exports = {
    addContent(id, title, route, image, text){
        let dateCreate = getDateActual();
        let content = {
            id: id,
            title: title,
            dateCreate: dateCreate,
            dateUp: dateCreate,
            route: route,
            image: image,
            text: text
        }
        fs.writeFileSync(`Data/${content.route.replace('/', '')}.json`, JSON.stringify(content));   
    },
    getContents: async function(){
        let files = await getFilesByDirectory("./Data");
        let contents = [];
        files.forEach((file)=>{
            contents.push(JSON.parse(fs.readFileSync("./Data/"+file, 'utf8')));
        })
        return contents;
    },
    searchContent: async function(search){
        let contents = await this.getContents();
        let resSearch = [];

        contents.forEach((content)=>{
            if(
                content.title.normalize("NFC").includes(search.normalize("NFC"))||
                content.route.normalize("NFC").includes(search.normalize("NFC"))||
                content.text.normalize("NFC").includes(search.normalize("NFC"))
            )
                resSearch.push(content);
        });
        
        return resSearch;
    },
    getContentById: async function(id){
        let contents = await this.getContents();
        for(const content of contents){
            if(id == content.id)
                return content;
        }
        return null;
    },
    contentsIsEmpty: async function(){
        return((await this.getContents()) == []);
    },
    deleteContentById: async function(id){
        let files = await getFilesByDirectory("./Data");
        files.forEach((file)=>{
            let idFile = JSON.parse(fs.readFileSync("./Data/"+file, 'utf8')).id;
            if(id == idFile)
                fs.unlinkSync("./Data/"+file);
        })
    },
    editContentById: async function(id, title, image, text){
        let contents = await this.getContents();
        contents.forEach((content) =>{
            if(content.id == id){
                let dateUp = getDateActual();
                
                content.title = title,
                content.dateUp = dateUp,
                content.image = image,
                content.text = text
                
                fs.writeFileSync(`Data/${content.route.replace('/', '')}.json`, JSON.stringify(content));
            }
            
        });
    
    }






};