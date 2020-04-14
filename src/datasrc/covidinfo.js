const axios = require('axios');
const cheerio = require('cheerio');
const covidurl = 'https://coronavirus-ph-api.herokuapp.com';
const worldOmetersUrl = "https://www.worldometers.info/coronavirus/country/philippines/"

//bbox contains the information about the land area by providing 2 sets of coordinates
const getLandArea = (geodata) =>{
    //create an arbitrary landarea if bbox is not available
    if(!geodata.bbox) {
        return [geodata.coordinates[0]-.02, //longitude
                geodata.coordinates[1]-.02, //latitude
                geodata.coordinates[0]+.02, //longitude, and then another latitude
                geodata.coordinates[1]+.02].map((curr)=>Number(curr.toPrecision(9)));
    }
    return geodata.bbox;
}

//nope, not that X
const checkIfXisWithinTheArea = (landAreaCoordinates, currLongitude, currLatitude) => {
    const longitudeRange = [landAreaCoordinates[0],landAreaCoordinates[2], currLongitude].sort();
    const latitudeRange = [landAreaCoordinates[1], landAreaCoordinates[3], currLatitude].sort();
    return (longitudeRange.indexOf(currLongitude) === 1) && (latitudeRange.indexOf(currLatitude) === 1) ? true : false;
};

//get X (hospital or individuals) within the geodata provided inside inputData
const getNearbyX = (inputData,callback) =>{
    const searchType = {individuals:"cases", hospitals:"facilities"};
    const landAreaCoordinates = getLandArea(inputData.geodata);
    const response = axios.get(`${covidurl}/${searchType[inputData.type]}`);

    response.then((response)=>{
        const elementsWithinTheArea = response.data.filter((curr) => {
            return checkIfXisWithinTheArea(landAreaCoordinates,curr.longitude,curr.latitude);
        });
        callback(undefined,elementsWithinTheArea);
    }).catch((error)=>{
        callback(error,undefined);
    });
};

const createFormattedCurrentDate = (checkYesterday=0)=>{
    const dateNow = new Date().toLocaleDateString('en-US');
    let [month, date, year] = dateNow.split('/');

    [date,month] = [date, month].map((curr)=>{
        return curr.length === 1 ? `0${curr}` : curr;
    });

    return `${year}-${month}-${date-checkYesterday}`;
}

const scrapeWorldOmetersData = (callback) =>{
    const response = axios.get(worldOmetersUrl);
    response.then((result)=>{
        const data = result.data; //get result data
        const $ = cheerio.load(data); //load data to cheerio

        const newCasesQuery = `#newsdate${createFormattedCurrentDate()}`; //this is the [selector] query for new cases
        const casesYesterdayQuery = `#newsdate${createFormattedCurrentDate(1)}`; //subtract date by 1 to get cases yesterday
        const totalsQuery = `.maincounter-number`; //this is for the total cases, order is [total cases, deaths, recoveries]
        
        let newCasesString = $(`${newCasesQuery}`).text();
        let yesterdayCasesString = $(`${casesYesterdayQuery}`).text();
        let totalsString = $(`${totalsQuery}`).text();

        //remove line breaks
        newCasesString = newCasesString.replace(/\n+/g,''); 
        yesterdayCasesString = yesterdayCasesString.replace(/\n+/g,'');

        let newCases,newDeaths,casesYesterday, deathsYesterday;

        if(newCasesString.length>0){
            //deconstruct string to new cases and new deaths
            [newCases, newDeaths] = newCasesString.split(' ').filter((curr)=>isFinite(curr));    
        }
        if(yesterdayCasesString.length>0){
            //do the same
            [casesYesterday, deathsYesterday] = yesterdayCasesString.split(' ').filter((curr)=>isFinite(curr));
        }

        //sanitize the goddamn string. whew. sorry for the messy chain of string manipulations, I promise you it works.
        const [totalCases,totalDeaths,recoveries] = totalsString.replace(',','').replace(' ','').split('\n').filter(curr=>curr!='');
       
        callback(undefined,{
            newCases,
            newDeaths,
            casesYesterday,
            deathsYesterday,
            totalCases,
            totalDeaths,
            recoveries
        });
    });
};

module.exports = {getNearbyX,scrapeWorldOmetersData};