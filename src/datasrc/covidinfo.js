const axios = require('axios');
const covidurl = 'https://coronavirus-ph-api.herokuapp.com'

const getNearbyX = (options,callback) =>{
    const typeMap = {individuals:"cases", hospitals:"facilities"};
    const response = axios.get(`${covidurl}/${typeMap[options.type]}`);
    
    response.then((response)=>{
        callback(undefined,response.data);
    }).catch((error)=>{
        callback(error,undefined);
    });
};

module.exports = {getNearbyX};