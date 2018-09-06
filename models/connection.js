const mongoose = require('mongoose');

let connectionSchema = mongoose.Schema({

    fromCityId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fromCityName:{
        type: String,
        required: true
    },
    toCityId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toCityName:{
        type: String,
        required: true
    },
    durationInMinutes:{
        type: Number,
        required: true
    },
    ticketPriceInEUR:{
        type: Number,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }

    
    
    });



    let Connection = module.exports = mongoose.model('Connection', connectionSchema);



    module.exports.getConnections = function() {
        
        let query = Connection.find();
        return query.exec();
    }

    module.exports.getConnectionById = function(id, callback) {
        
        let query = Connection.findById(id);
        return query.exec();
    }

    module.exports.addConnection = function(connectionName) {
        
        return Connection.create(connectionName);
    }

    module.exports.deleteConnectionById = function(id, callback) {

        let query = Connection.findByIdAndRemove(id);
        return query.exec();
    }