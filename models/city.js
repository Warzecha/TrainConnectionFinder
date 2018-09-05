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



    module.exports.getCities = function() {
        
        let query = City.find();
        return query.exec();
    }

    module.exports.getCityById = function(id, callback) {
        
        let query = City.findById(id);
        return query.exec();
    }

    module.exports.addCity = function(cityName, callback) {
        
        return City.create(cityName, callback);
    }

    module.exports.deleteCityById = function(id, callback) {

        let query = City.findByIdAndRemove(id);
        return query.exec();
    }