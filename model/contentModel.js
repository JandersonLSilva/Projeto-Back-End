let id_count = 0;
let contents = [];

const fs = require('fs');

module.exports = {
    getDateActual(){
        const date = new Date();

        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = String(date.getFullYear());

        let today = `${day}/${month}/${year}`
        return today;
    },
    addContent(title, route, image, text){
        if(!this.contentsIsEmpty()){
            contents = JSON.parse(fs.readFileSync('contents.json', 'utf8'));
            id_count = contents[contents.length - 1].id + 1;
        }
        let dateUp = this.getDateActual();
        let content = {
            id: id_count,
            title: title,
            dateUp: dateUp,
            route: route,
            image: image,
            text: text
        }
        
        contents.push(content);
        // const temp =  JSON.stringify(contents)+'\n';
        fs.writeFileSync('contents.json', JSON.stringify(contents));        
    },
    searchContent(search){
        let resSearch = [];
        let j = 0;
        if(!this.contentsIsEmpty()){
            contents = JSON.parse(fs.readFileSync('contents.json', 'utf8'));
            for(const content of contents){
                if(
                    content.title.toUpperCase().includes(search.toUpperCase())||
                    content.route.toUpperCase().includes(search.toUpperCase())||
                    content.text.toUpperCase().includes(search.toUpperCase())
                ){
                    resSearch.push(content);
                }
            }
        }
        return resSearch;
    },
    getContents(){
        // console.log(!this.contentsIsEmpty());
        if(!this.contentsIsEmpty())
            contents = JSON.parse(fs.readFileSync('contents.json', 'utf8'));
        // let lenght = contents.length
        // console.log(contents.slice(lenght-1)[0].id);
        return contents;
    },
    getContentById(id){
        if(!this.contentsIsEmpty()){
            contents = JSON.parse(fs.readFileSync('contents.json', 'utf8'));
            for(const content of contents){
                if(id === content.id)
                    return content;
            }
        }
        return null;
    },
    contentsIsEmpty(){
        try {
            contents = JSON.parse(fs.readFileSync('contents.json', 'utf8'));
            return false;
        } catch (error) {
            return true;
        }
        
    }







};