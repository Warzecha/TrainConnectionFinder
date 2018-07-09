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






// let connections = [
//     {id: 1, begin: 'wroclaw', end: 'krakow', length: 200},
//     {id: 2, begin: 'krakow', end: 'trzebinia', length: 40}
// ];

app.get('/', (req, res) => {

    res.send('Welcome in my train connection finder');

})

// app.post('/api/connections/', (req, res) => {

//     const newConnection = {
//         id: connections.length + 1,
//         begin: req.body.begin,
//         end: req.body.end,
//         length: parseFloat(req.body.length)

//     }

//     connections.push(newConnection);
//     res.send(newConnection);

// })


// app.get('/api/shortest/:start/:destination', (req, res) => {

//     res.send(req.params);
// })

// app.get('/api/connections/', (req, res) => {

//     res.send(connections);
// })

app.get('/api/cities', (req, res) => {
    City.getCities(function(err, cities){
        if(err) {
            throw err;
        
        }
        
        res.json(cities)

    })

})

app.post('/api/cities/', (req, res) => {
    let newCity = req.body;
    City.addCity(newCity, function(err, city){
        if(err) {
            console.log(err)
        }
        
        res.json(newCity);

    })

})


app.get('/api/cities/:id', (req, res) => {
    console.log(req.params.id);
    City.getCityById(req.params.id, function(err, city){
        if(err) {
            console.log(err.message);
        }
        
        res.json(city)

    })

})


const port = process.env.PORT || 3000;
app.listen(port , () => { console.log(`Listening on port ${port}`)});
