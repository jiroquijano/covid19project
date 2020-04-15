export default class Results{
    constructor(resultsData){
        this.resultsArray = resultsData.data;
        console.log(this.resultsArray);
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

    countArrElementsWhichSatisfies(key, value){
        return this.resultsArray.filter((curr)=> curr[key].toLowerCase() === value.toLowerCase()).length;
    }

} 