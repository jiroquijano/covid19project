const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {getNearbyX} = require('./datasrc/covidinfo');
const {getGeoLocation} = require('./geolocation/geolocation');

app.get('/',(req,res)=>{
    res.send('hello world');
});

//this will be used for getting hospitals near queried coordinates
app.get('/hospitals',(req,res)=>{
    if(!req.query.address) return res.send({error: 'no address provided!'});

    options = {lat:0, long:0, type:"hospitals"};
    getNearbyX(options,(error,data)=>{
        if(error) return res.send({error});
        res.send(data);
    });
});

//this will be used for getting individuals near provided coordinates
app.get('/individuals',(req,res)=>{
    if(!req.query.address) return res.send({error: 'no address provided!'});
    
    options = {lat:0, long:0, type:"individuals"}
    getNearbyX(options,(error,data)=>{
        if(error) return res.send({error});
        res.send(data);
    });
});


app.listen(port, ()=>console.log(`listening to port ${port}`));