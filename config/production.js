'use strict';

module.exports = {
  env: 'production',
  db: process.env.MONGOHQ_URL || process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  geocodingApiKey: process.env.GEOCODE_API_KEY,
  googleMapsApiKey: process.env.GMAPS_API_KEY
};