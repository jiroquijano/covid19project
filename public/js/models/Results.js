export default class Results{
    constructor(resultsData,type){
        this.resultsArray = type === 'hospitals' ? resultsData.data: resultsData;
    };

    getTotalOfX(type){
        if(this.resultsArray.length > 0){
            return this.resultsArray.reduce((acc,curr)=>{
                return acc+curr[`${type}`];
            },0); 
        }  
        return 0;
    }

    getResultsArray(){
        return this.resultsArray;
    }

} 