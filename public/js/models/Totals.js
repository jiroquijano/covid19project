export default class Totals {
    constructor(){
    };

    async getTotalsData(callback){
        const result = await fetch('/scrape');
        const data = await result.json();
        callback(data);
    }
}