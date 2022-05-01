const mongoose = require('mongoose');

const Planet = new mongoose.Schema({
    planetName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    planetSurfaceAreaInSquareKm: {
        type: Number,
        required: true,
    },
    planetDistanceFromSunInKm: {
        type: Number,
        required: true,
    },
    planetMoons: {
        type: Array,
        required: true,
    },
    planetAverageTemperatureInCelsius: {
        type: Number,
        required: true,
    },
    planetRadiusInKm: {
        type: Number,
        required: true,
    },
    planetMassInKg: {
        type: Number,
        required: true,
    },
    planetOrbitalPeriodInDays: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('planet', Planet);
