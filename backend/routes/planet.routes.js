const express = require('express');
const router = express.Router();

const PlanetModel = require('../models/Planet');

/**
 * @api {get} /api/planets/ Get all planets
 */
router.get('/', async (req, res) => {
    const {
        ids,
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

    if (ids) {
        conditions._id = {
            $in: ids.split(','),
        };
    }

    if (name && name.trim().length > 0) {
        conditions.planetName = {
            $regex: new RegExp(name.trim(), 'i'),
        };
    }

    if (isFinite(surfaceAreaMin) || isFinite(surfaceAreaMax)) {
        const min = isFinite(surfaceAreaMin) && surfaceAreaMin > 0 ? surfaceAreaMin : 0;
        const max = isFinite(surfaceAreaMax) ? surfaceAreaMax : Number.MAX_SAFE_INTEGER;
        conditions.planetSurfaceAreaInSquareKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(distanceFromSunMin) || isFinite(distanceFromSunMax)) {
        const min = isFinite(distanceFromSunMin) && distanceFromSunMin > 0 ? distanceFromSunMin : 0;
        const max = isFinite(distanceFromSunMax) ? distanceFromSunMax : Number.MAX_SAFE_INTEGER;
        conditions.planetDistanceFromSunInKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(averageTemperatureMin) || isFinite(averageTemperatureMax)) {
        const min = isFinite(averageTemperatureMin) ? averageTemperatureMin : Number.MIN_SAFE_INTEGER;
        const max = isFinite(averageTemperatureMax) ? averageTemperatureMax : Number.MAX_SAFE_INTEGER;
        conditions.planetAverageTemperatureInCelsius = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(radiusMin) || isFinite(radiusMax)) {
        const min = isFinite(radiusMin) ? radiusMin : 0;
        const max = isFinite(radiusMax) ? radiusMax : Number.MAX_SAFE_INTEGER;
        conditions.planetRadiusInKm = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(massMin) || isFinite(massMax)) {
        const min = isFinite(massMin) ? massMin : 0;
        const max = isFinite(massMax) ? massMax : Number.MAX_SAFE_INTEGER;
        conditions.planetMassInKg = {
            $gte: min,
            $lte: max,
        };
    }

    if (isFinite(orbitalPeriodMin) || isFinite(orbitalPeriodMax)) {
        const min = isFinite(orbitalPeriodMin) ? orbitalPeriodMin : 0;
        const max = isFinite(orbitalPeriodMax) ? orbitalPeriodMax : Number.MAX_SAFE_INTEGER;
        conditions.planetOrbitalPeriodInDays = {
            $gte: min,
            $lte: max,
        };
    }

    try {
        let planets = await PlanetModel.find(conditions);
        const planetsCount = await PlanetModel.count();
        if (planets.length === 0 && name && name.trim().length > 0) {
            planets = await PlanetModel.find({ planetMoons: new RegExp(name.trim(), 'i') });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: { result: planets, count: planetsCount },
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
            error: 'Please provide all required fields',
        });
    }

    try {
        const planet = await new PlanetModel({
            planetName: name,
            planetSurfaceAreaInSquareKm: surfaceAreaInSquareKm,
            planetDistanceFromSunInKm: distanceFromSunInKm,
            planetMoons: moons,
            planetAverageTemperatureInCelsius: averageTemperatureInCelsius,
            planetRadiusInKm: radiusInKm,
            planetMassInKg: massInKg,
            planetOrbitalPeriodInDays: orbitalPeriodInDays,
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

        if (name) planet.planetName = name;
        if (surfaceAreaInSquareKm) planet.planetSurfaceAreaInSquareKm = surfaceAreaInSquareKm;
        if (distanceFromSunInKm) planet.planetDistanceFromSunInKm = distanceFromSunInKm;
        if (moons) planet.planetMoons = moons;
        if (averageTemperatureInCelsius) planet.planetAverageTemperatureInCelsius = averageTemperatureInCelsius;
        if (radiusInKm) planet.planetRadiusInKm = radiusInKm;
        if (massInKg) planet.planetMassInKg = massInKg;
        if (orbitalPeriodInDays) planet.planetOrbitalPeriodInDays = orbitalPeriodInDays;

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
