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

module.exports = router;
