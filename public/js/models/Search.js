export default class Search{
    constructor({searchValue,searchType}){
        this.searchValue = searchValue;
        this.searchType = searchType;
    }

    async getInformationFromBackend(callback){
        const type = this.searchType.toLowerCase().split(' ')[0];
        const result = await fetch(`/${type}?address=${this.searchValue}`);
        const data = await result.json();
        callback(data);
    }
};