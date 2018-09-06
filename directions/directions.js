const Citiy = require('../models/city');
const Connection = require('../models/connection');



module.exports.findDirections = function(fromCityId, toCityId, type){

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

    

})

    
} 