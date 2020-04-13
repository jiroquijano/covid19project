const axios = require('axios');

const localizeToPhilippinesOnly = (places) =>{
    return places.filter((curr)=>{
        return curr.place_name.toLowerCase().includes("philippines");
    });
}

const getGeoLocation = (address,callback) =>{
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=4&access_token=pk.eyJ1Ijoiamlyb3F1aWphbm8iLCJhIjoiY2s4MXJvbW9xMHRwNzNtb3E4djltN3UxaCJ9.XJy-r35twz2mNNXikiALHA`;
    const mapboxResult = axios(mapboxURL);
    mapboxResult.then((response)=>{
        const localizedPlaces = localizeToPhilippinesOnly(response.data.features);
        const mostRelevant = localizedPlaces[0];
        const {place_name:name, bbox, center:coordinates} = mostRelevant;
        const alternativePlaces = localizedPlaces.slice(1).map((curr)=>curr.place_name); //suggestions of other places
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
