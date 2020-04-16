export default class Search{
    constructor({searchValue,searchType}){
        this.searchValue = searchValue;
        this.searchType = searchType.toLowerCase().split(' ')[0];
    }

    async getInformationFromBackend(callback){
        const result = await fetch(`/${this.searchType}?address=${this.searchValue}`);
        const data = await result.json();
        this.data = data;
        callback(data);
    }

    async getMapImage(coordinates, callback){
        const result = await fetch(`/geoimage?coordinates=${coordinates[0]},${coordinates[1]}`);
        const imgDataSrc = await result.json();
        callback(imgDataSrc);
    }

    getType(){
        return this.searchType;
    }
};