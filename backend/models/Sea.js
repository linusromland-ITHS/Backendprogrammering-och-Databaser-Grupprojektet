const mongoose = require('mongoose');

const Sea = new mongoose.Schema({
    seaName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    seaSizeInSquareKm: {
        type: Number,
        required: true,
    },
    seaAverageDepthInMeters: {
        type: Number,
        required: true,
    },
    seaSpecies: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('sea', Sea);
