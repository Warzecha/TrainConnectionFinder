const mongoose = require('mongoose');

let citySchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }

    
    
    });



    let City = module.exports = mongoose.model('City', citySchema);



    module.exports.getCities = function(callback, limit) {
        
        City.find(callback).limit(limit);
    }

    module.exports.getCityById = function(id, callback) {
        
        City.findById(id, callback);
    }

    module.exports.addCity = function(cityName, callback) {
        
        return City.create(cityName, callback);
    }

    module.exports.deleteCityById = function(id, callback) {

        City.remove({ _id: id }, callback);
    }