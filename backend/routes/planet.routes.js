const express = require('express');
const router = express.Router();

const PlanetModel = require('../models/Planet');

/**
 * @api {get} /api/planets/ Get all planets
 */
router.get('/', async (req, res) => {
    const {
        name,
        surfaceAreaMin,
        surfaceAreaMax,
        distanceFromSunMin,
        distanceFromSunMax,
        averageTemperatureMin,
        averageTemperatureMax,
        radiusMin,
        radiusMax,
        massMin,
        massMax,
        orbitalPeriodMin,
        orbitalPeriodMax,
    } = req.query;

    const conditions = {};

    if (name && name.trim().length > 0) {
        conditions.name = {
            $regex: new RegExp(name.trim(), 'i'),
        };
    }

    if (isFinite(surfaceAreaMin) || isFinite(surfaceAreaMax)) {
        const min = isFinite(surfaceAreaMin) && surfaceAreaMin > 0 ? surfaceAreaMin : 0;
        const max = isFinite(surfaceAreaMax) ? surfaceAreaMax : Number.MAX_SAFE_INTEGER;
        conditions.surfaceAreaInSquareKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(distanceFromSunMin) || isFinite(distanceFromSunMax)) {
        const min = isFinite(distanceFromSunMin) && distanceFromSunMin > 0 ? distanceFromSunMin : 0;
        const max = isFinite(distanceFromSunMax) ? distanceFromSunMax : Number.MAX_SAFE_INTEGER;
        conditions.distanceFromSunInKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(averageTemperatureMin) || isFinite(averageTemperatureMax)) {
        const min = isFinite(averageTemperatureMin) ? averageTemperatureMin : Number.MIN_SAFE_INTEGER;
        const max = isFinite(averageTemperatureMax) ? averageTemperatureMax : Number.MAX_SAFE_INTEGER;
        conditions.averageTemperatureInCelsius = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(radiusMin) || isFinite(radiusMax)) {
        const min = isFinite(radiusMin) ? radiusMin : 0;
        const max = isFinite(radiusMax) ? radiusMax : Number.MAX_SAFE_INTEGER;
        conditions.radiusInKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(massMin) || isFinite(massMax)) {
        const min = isFinite(massMin) ? massMin : 0;
        const max = isFinite(massMax) ? massMax : Number.MAX_SAFE_INTEGER;
        conditions.massInKg = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(orbitalPeriodMin) || isFinite(orbitalPeriodMax)) {
        const min = isFinite(orbitalPeriodMin) ? orbitalPeriodMin : 0;
        const max = isFinite(orbitalPeriodMax) ? orbitalPeriodMax : Number.MAX_SAFE_INTEGER;
        conditions.orbitalPeriodInDays = {
            $gte: min,
            $lte: max,
        };
    }

    try {
        let planets = await PlanetModel.find(conditions);

        if (planets.length === 0 && name && name.trim().length > 0) {
            planets = await PlanetModel.find({ moons: new RegExp(name.trim(), 'i') });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: planets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
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
