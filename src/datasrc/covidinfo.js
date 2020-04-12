const axios = require('axios');
const covidurl = 'https://coronavirus-ph-api.herokuapp.com'

//bbox contains the information about the land area by providing 2 sets of coordinates
const getLandArea = (geodata) =>{
    //create an arbitrary landarea if bbox is not available
    if(!geodata.bbox) {
        return [geodata.coordinates[0]-.01, //longitude
                geodata.coordinates[1]-.01, //latitude
                geodata.coordinates[0]+.01, //longitude, and then another latitude
                geodata.coordinates[1]+.01].map((curr)=>Number(curr.toPrecision(9)));
    }
    return geodata.bbox;
}

//nope, not that X
const checkIfXisWithinTheArea = (landAreaCoordinates, currLongitude, currLatitude) => {
    const longitudeRange = [landAreaCoordinates[0],landAreaCoordinates[2], currLongitude].sort();
    const latitudeRange = [landAreaCoordinates[1], landAreaCoordinates[3], currLatitude].sort();
    return (longitudeRange.indexOf(currLongitude) === 1) && (latitudeRange.indexOf(currLatitude) === 1) ? true : false;
};

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

module.exports = {getNearbyX};