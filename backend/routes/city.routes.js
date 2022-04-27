//Dependencies import
const express = require('express');
const router = express.Router();
const CityModel = require('../models/City');

/**
 * @api {get} /api/city/ Returns all cities
 */
router.get('/', async (req, res) => {
    try {
        const languages = await CityModel.findAll();
        res.json({
            success: true,
            error: '',
            data: languages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {post} /api/city/ Create a new City
 */
router.post('/', async (req, res) => {
    const { name, population } = req.body;

    if (!name || name.trim().length < 1 || !population) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid city name and city population.',
        });
    }

    try {
        const city = await CityModel.create({
            cityName: name,
            cityPopulation: population,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: city,
        });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The city ${name} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

/**
 * @api {put} /api/city/ Change a city based on id
 */
router.put('/', async (req, res) => {
    const { id, name, population } = req.body;

    if ((!name || name.trim().length < 1) && !population) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name and/or population.',
        });
    }

    try {
        const foundCity = await CityModel.findOne({ where: { cityID: id } });

        if (!foundCity) {
            res.status(404).json({
                success: false,
                error: `City with id  could not be found`,
            });
        }

        const updatedCity = await foundCity.update({ cityName: name, cityPopulation: population });

        res.json({ success: true, error: '', data: updatedCity });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The city ${name} already exists.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/city/ Delete a city
 */
router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a city id.',
        });
    }

    try {
        const deletedCity = await CityModel.destroy({ where: { cityID: id } });

        if (!deletedCity) {
            return res.status(404).json({
                success: false,
                error: `City with id ${id} could not be found`,
            });
        }

        res.json({ success: true, error: '', data: deletedCity });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                error: `City with id ${id} could not be deleted because it is being used as a capital in a country.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || `Could not delete city with id ${id}`,
        });
    }
});

module.exports = router;
