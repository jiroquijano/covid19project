export default class Search{
    constructor({searchValue,searchType}){
        this.searchValue = searchValue;
        this.searchType = searchType.toLowerCase().split(' ')[0];
    }

    async getInformationFromBackend(callback){
        const result = await fetch(`/${this.searchType}?address=${this.searchValue}`);
        const data = await result.json();
        callback(data);
    }

    getType(){
        return this.searchType;
    }
};