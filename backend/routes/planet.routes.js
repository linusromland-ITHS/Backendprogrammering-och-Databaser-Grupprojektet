const express = require('express');
const router = express.Router();

const PlanetModel = require('../models/Planet');

router.get('/', async (req, res) => {
    try {
        const allPlanets = await PlanetModel.find();
        res.json({
            success: true,
            data: allPlanets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Something went wrong retrieving all planets',
        });
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        surfaceAreaInSquareKm,
        distanceFromSunInKm,
        moons,
        averageTemperatureInCelsius,
        radiusInKm,
        massInKg,
        orbitalPeriodInDays,
    } = req.body;

    if (
        !name ||
        !surfaceAreaInSquareKm ||
        !distanceFromSunInKm ||
        !moons ||
        !averageTemperatureInCelsius ||
        !radiusInKm ||
        !massInKg ||
        !orbitalPeriodInDays
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        const planet = await new PlanetModel({
            name,
            surfaceAreaInSquareKm,
            distanceFromSunInKm,
            moons,
            averageTemperatureInCelsius,
            radiusInKm,
            massInKg,
            orbitalPeriodInDays,
        });

        const savedPlanet = await planet.save();

        res.status(201).json({ success: true, error: '', data: savedPlanet });
    } catch (error) {
        if (error.message.includes('duplicate')) {
            return res.status(400).json({
                success: false,
                error: `Planet with name ${name} already exists`,
            });
        }

        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
