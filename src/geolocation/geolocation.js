const axios = require('axios');

const getGeoLocation = (address) =>{
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=3&access_token=pk.eyJ1Ijoiamlyb3F1aWphbm8iLCJhIjoiY2s4MXJvbW9xMHRwNzNtb3E4djltN3UxaCJ9.XJy-r35twz2mNNXikiALHA`;
    const mapboxResult = axios(mapboxURL);
    mapboxResult.then((response)=>{
        console.log(response.data.features[0]);
    }).catch((error)=>{
        console.log(error);
    });
}

module.exports = {getGeoLocation};
