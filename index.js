/* eslint-disable */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const config = require('./config/index');

City = require('./models/city');
Connection = require('./models/connection');

mongoose.connect(config.db);
// mongoose.connect('mongodb://warzecha:elomelo320@ds139992.mlab.com:39992/train-finder-db');

let db = mongoose.connection;

app.use(cors({
    origin: ['http://localhost:8080', 'https://warzecha.github.io'],
    credentials: true
}));

app.use(bodyParser.json());

// Error handling middleware
// TODO: use arrow function (check if possible)
app.use(function (err, req, res, next) {
    res.send({ error: err.message });
})

app.get('/api/cities/', (req, res) => {
    City.getCities()
    .then((cities) => {
        res.json(cities);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    })
})

app.get('/api/cities/:id', (req, res) => {
    City.getCityById(req.params.id)
    .then((city) => {
        res.json(city)
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
        
    
})

app.post('/api/cities/', (req, res) => {
    // console.log(req.body);
    let newCityName = req.body.name;
    if (newCityName) {
        axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + newCityName + '&key=AIzaSyDOfkOKdHs2-WM1ek8yOtJA0bBWQn6V298')
            // .then(response => {return response.json()})
            .then((response) => {
                let newCity = {
                    'name': response.data.results[0].formatted_address,
                    'lat': response.data.results[0].geometry.location.lat,
                    'lng': response.data.results[0].geometry.location.lng,
                }
                City.addCity(newCity)
                    .then(function (city) {
                        res.json(city)
                    })
                    .catch(function (err) {
                        res.status(400).send(err.message);
                    })
            })
            .catch((error) => { console.error(error) });
    } else {
        res.status(400).send('Property name is required');
    }
})

app.delete('/api/cities/:id', (req, res) => {
    let id = req.params.id;
    City.deleteCityById(id)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(404).send(err.message);
        });
        
    });


//Connections

app.get('/api/connections/', (req, res) => {
    Connection.getConnections()
    .then((connections) => {
        res.json(connections)
    })
    .catch((err) => {
        res.send(err.message);
    })
})

app.get('/api/connections/:id', (req, res) => {
    Connection.getConnectionById(req.params.id)
    .then((connection) => {
        res.json(connection);

    })
    .catch((err) => {
        res.send(err.message);
    })
    
})

app.post('/api/connections/', (req, res) => {
    let newConnection = req.body;
    Connection.addConnection(newConnection)
        .then(function (connection) {
            res.json(connection)
        }).catch(function (err) {
            res.status(400).send(err.message);
        })
})

app.delete('/api/connections/:id', (req, res) => {
    let id = req.params.id;
    Connection.deleteConnectionById(id)
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(404).send(err.message);
    })
})

app.get('/api/directions/:from/:to/:routeMode', (req, res) => {

    console.log('getting directions');

    let fromCityId = req.params.from;
    let toCityId = req.params.to;
    let routeMode = req.params.routeMode;

    let cities;
    let connections;
    let fromCity;
    let toCity;

    Promise.all([
        City.getCities(),
        Connection.getConnections(),
        City.getCityById(fromCityId),
        City.getCityById(toCityId)

    ])
    .then((responses) => {
        cities = responses[0];
        connections = responses[1];
        fromCity = responses[2];
        toCity = responses[3];
    
        console.log(fromCity);






    
        let response = {
            from: fromCity,
            to: toCity
        }
    
        res.json(response);

        

    })

    // console.log(fromCity);

    


    





})
// const port = process.env.PORT || 3000;
app.listen(config.port, () => { console.log(`Listening on port ${config.port}`) });


module.exports = app;
