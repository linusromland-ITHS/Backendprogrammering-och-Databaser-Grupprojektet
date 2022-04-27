const express = require('express');
const router = express.Router();

const PlanetModel = require('../models/Planet');

/**
 * @api {get} /api/planets/ Get all planets
 */
router.get('/', async (req, res) => {
    try {
        const allPlanets = await PlanetModel.find();
        res.status(200).json({
            success: true,
            error: '',
            data: allPlanets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Something went wrong retrieving all planets',
        });
    }
});

/**
 * @api {post} /api/planets/ Create a planet
 */
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
        name.trim().length < 1 ||
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

        res.status(201).json({
            success: true,
            error: '',
            data: savedPlanet,
        });
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

/**
 * @api {put} /api/planets/ Edit a planet
 */
router.put('/', async (req, res) => {
    const {
        id,
        name,
        surfaceAreaInSquareKm,
        distanceFromSunInKm,
        moons,
        averageTemperatureInCelsius,
        radiusInKm,
        massInKg,
        orbitalPeriodInDays,
    } = req.body;

    if (!id) {
        return res.status(422).json({
            success: false,
            error: 'Please include planet id',
        });
    }

    if (
        (!name || name.trim().length < 1) &&
        !surfaceAreaInSquareKm &&
        !distanceFromSunInKm &&
        !moons &&
        !averageTemperatureInCelsius &&
        !radiusInKm &&
        !massInKg &&
        !orbitalPeriodInDays
    ) {
        return res.status(422).json({
            success: false,
            error: 'Please include a field to update',
        });
    }

    try {
        let planet = await PlanetModel.findById(id);

        if (!planet) {
            return res.status(404).json({
                success: false,
                error: `Planet with id ${id} could not be found`,
            });
        }

        if (name) planet.name = name;
        if (surfaceAreaInSquareKm) planet.surfaceAreaInSquareKm = surfaceAreaInSquareKm;
        if (distanceFromSunInKm) planet.distanceFromSunInKm = distanceFromSunInKm;
        if (moons) planet.moons = moons;
        if (averageTemperatureInCelsius) planet.averageTemperatureInCelsius = averageTemperatureInCelsius;
        if (radiusInKm) planet.radiusInKm = radiusInKm;
        if (massInKg) planet.massInKg = massInKg;
        if (orbitalPeriodInDays) planet.orbitalPeriodInDays = orbitalPeriodInDays;

        planet = await planet.save();

        res.status(200).json({
            success: true,
            error: '',
            data: planet,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/planets/ Delete a planet
 */
router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(422).json({
            success: false,
            error: 'Please provide a planet ID',
        });
    }

    try {
        const planet = await PlanetModel.findByIdAndDelete(id);

        if (!planet) {
            return res.status(404).json({
                success: false,
                error: `Planet with id ${id} could not be found`,
            });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: 1,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
