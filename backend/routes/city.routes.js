//Dependencies import
const express = require('express');
const router = express.Router();
const CityModel = require('../models/City');

/**
 * @api {post} /api/city/ Create a new City
 */
router.post('/', async (req, res) => {
    if ((!req.body.cityName && req.body.cityName.length < 1) || !req.body.cityPopulation) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid city name and city population.',
        });
    }

    try {
        const city = await CityModel.create({
            cityName: req.body.cityName,
            cityPopulation: req.body.cityPopulation,
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
                error: `The city ${req.body.cityName} already exists.`,
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
    const { cityID, cityName, cityPopulation } = req.body;
    if (!cityName && !cityName.length < 1 && !cityPopulation) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name and/or population.',
        });
    }

    try {
        const foundCity = await CityModel.findOne({ where: { cityID } });

        if (!foundCity) {
            res.status(404).json({
                success: false,
                error: `City with id ${cityID} could not be found`,
            });
        }

        const updatedCity = await foundCity.update({ cityName: cityName, cityPopulation: cityPopulation });

        res.json({ success: true, error: '', data: updatedCity });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The city ${cityName} already exists.`,
            });
        }
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
