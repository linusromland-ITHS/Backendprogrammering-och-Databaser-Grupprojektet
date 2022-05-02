//Dependencies import
const express = require('express');
const router = express.Router();
const ContinentModel = require('../models/Continent');

/**
 * @api {get} /api/continent/ Returns all continents
 */
router.get('/', async (req, res) => {
    try {
        const { ids } = req.query;
        if (ids) {
            const continents = await ContinentModel.findAll({ where: { continentID: ids.split(',') } });
            res.status(200).json({
                success: true,
                error: '',
                data: continents,
            });
        } else {
            const continents = await ContinentModel.findAll();
            res.status(200).json({
                success: true,
                error: '',
                data: continents,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {post} /api/continent/ Create a new continent
 */
router.post('/', async (req, res) => {
    const { name, population, size } = req.body;

    if (!name || name.trim().length < 1 || !population || !size) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name, population and size.',
        });
    }

    try {
        const continent = await ContinentModel.create({
            continentName: name,
            continentPopulation: population,
            continentSize: size,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: continent,
        });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The continent ${name} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

/**
 * @api {put} /api/continent/ Edits the continent with the specified id
 */
router.put('/', async (req, res) => {
    const { id, name, population, size } = req.body;

    const continent = await ContinentModel.findByPk(id);
    if (!continent) {
        return res.status(404).json({
            success: false,
            error: 'Continent not found.',
        });
    }

    if ((!name || name.trim().length < 1) && !population && !size) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name, population or size.',
        });
    }

    try {
        const updatedContinent = await continent.update({
            continentName: name,
            continentPopulation: population,
            continentSize: size,
        });
        res.status(200).json({
            success: true,
            error: '',
            data: updatedContinent,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The continent ${name} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/continent/ Delete a continent
 */
router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a continent ID',
        });
    }

    try {
        // Delete continent from database
        const continent = await ContinentModel.destroy({
            where: { continentID: id },
        });

        if (continent === 0) {
            return res.status(404).json({
                success: false,
                error: 'Continent not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                error: '',
                data: continent,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
