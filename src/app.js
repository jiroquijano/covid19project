const express = require('express');
const path = require('path');
const hbs = require('hbs');
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
const app = express();
const port = process.env.PORT || 3000;
const {getNearbyX,scrapeWorldOmetersData} = require('./datasrc/covidinfo');
const {getGeoLocation} = require('./geolocation/geolocation');

app.use(express.static(publicDirectoryPath)); //for serving up the static files in public directory

//setup views and view engine as handlebars
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//ROOT route
app.get('/',(req,res)=>{
    res.render('index');
});

//this will be used for getting hospitals near queried coordinates
app.get('/hospitals',(req,res)=>{
    if(!req.query.address) return res.send({error: 'no address provided!'});
    getGeoLocation(req.query.address, (error,geodata)=>{
        if(error) return res.send({error});
        inputData = {geodata, type:"hospitals"};

        getNearbyX(inputData,(error,data)=>{
            if(error) return res.send({error});
            res.send({geodata,data});
        });
    });
});

//this will be used for getting individuals near provided coordinates
app.get('/individuals',(req,res)=>{
    if(!req.query.address) return res.send({error: 'no address provided!'});
    getGeoLocation(req.query.address, (error,geodata)=>{
        if(error) return res.send({error});
        inputData = {geodata, type:"individuals"};

        getNearbyX(inputData,(error,data)=>{
            if(error) return res.send({error});
            res.send({geodata,data});
        });
    });
});

//scrape daily reports from world ometers yesterday
app.get('/scrape',(req,res)=>{
    scrapeWorldOmetersData((error,data)=>{
        if(error) return res.send(error);
        res.send(data);
    });
});


app.listen(port, ()=>console.log(`listening to port ${port}`));