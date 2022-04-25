const mongoose = require('mongoose');

const Planet = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    surfaceAreaInSquareKm: {
        type: Number,
        required: true,
    },
    distanceFromSunInKm: {
        type: Number,
        required: true,
    },
    numberOfMoons: {
        type: Number,
        required: true,
    },
    averageTemperatureInCelsius: {
        type: Number,
        required: true,
    },
    radiusInKm: {
        type: Number,
        required: true,
    },
    massInKg: {
        type: Number,
        required: true,
    },
    orbitalPeriodInDays: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('planet', Planet);
