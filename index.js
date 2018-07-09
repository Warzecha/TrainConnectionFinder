/* eslint-disable */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

City = require('./models/city');

mongoose.connect('mongodb://localhost/train_connections');

let db = mongoose.connection;

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


app.use(bodyParser.json());


// Error handling middleware
// TODO: use arrow function (check if possible)
app.use(function(err, req, res, next){

    console.log('========== byl error');
    res.send({error: err.message});

})


app.get('/api/cities', (req, res) => {
    City.getCities(function(err, cities){
        if(err) {
            //  throw err;
            res.send(err.message);
        
        }
        
        res.json(cities)

    })

})

app.get('/api/cities/:id', (req, res) => {
    
    City.getCityById(req.params.id, function(err, city){
        if(err) {
                // console.log('=======================================================');
                // throw err;
                res.send(err.message);
            }
            
            res.json(city)
            
        })
        
    })
    
    app.post('/api/cities/', (req, res, next) => {
        let newCity = req.body;
        City.addCity(newCity, (err, city) => {
            if(err) {
                // console.log('=======================================================');
                // throw err;
                res.status(400).send(err.message);
            }
            
            res.json(city)
            
        })
    })

    
    
const port = process.env.PORT || 3000;
app.listen(port , () => { console.log(`Listening on port ${port}`)});
