const axios = require('axios');

const getGeoLocation = (address,callback) =>{
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=3&access_token=pk.eyJ1Ijoiamlyb3F1aWphbm8iLCJhIjoiY2s4MXJvbW9xMHRwNzNtb3E4djltN3UxaCJ9.XJy-r35twz2mNNXikiALHA`;
    const mapboxResult = axios(mapboxURL);
    mapboxResult.then((response)=>{
        const {place_name:name, bbox, center:coordinates} = response.data.features[0];
        const alternativePlaces = [response.data.features[1].text, response.data.features[2].text];
        console.log(similarPlaces);
        callback(undefined,{
            name,
            bbox,
            coordinates,
            alternativePlaces
        });
    }).catch((error)=>{
        callback(error,undefined);
    });
}

module.exports = {getGeoLocation};
