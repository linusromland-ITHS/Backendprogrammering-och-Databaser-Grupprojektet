const express = require('express');
const router = express.Router();

const ReligionModel = require('../models/Religion');

/**
 * @api {get} /api/religion Gets all religion
 */
router.get('/', async (req, res) => {
    const { ids } = req.body;

    try {
        if (ids) {
            const religions = await ReligionModel.findAll({
                where: { religionID: ids },
            });
            res.status(200).json({
                success: true,
                error: '',
                data: religions,
            });
        } else {
            const religions = await ReligionModel.findAll();
            res.status(200).json({
                success: true,
                error: '',
                data: religions,
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
 * @api {post} /api/religion/ Create a new religion
 */
router.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name',
        });
    }
    try {
        const savedReligion = await ReligionModel.create({
            religionName: name,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: savedReligion,
        });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The religion ${name} already exists.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {put} /api/religion/ Change a religion based on id
 */
router.put('/', async (req, res) => {
    const { id, name } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a id',
        });
    }

    if (!name || name.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name',
        });
    }

    try {
        const foundReligion = await ReligionModel.findOne({ where: { religionID: id } });

        if (!foundReligion) {
            return res.status(404).json({
                success: false,
                error: `Religion with id ${id} could not be found`,
            });
        }

        const updatedReligion = await foundReligion.update({ religionName: name });

        res.status(200).json({
            success: true,
            error: '',
            data: updatedReligion,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The religion ${name} already exists.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/religion/ Delete a religion
 */
router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const deletedReligionID = await ReligionModel.destroy({ where: { religionID: id } });

        if (!deletedReligionID) {
            return res.status(404).json({
                success: false,
                error: `Religion with id ${id} could not be found`,
            });
        }

        res.status(200).json({
            success: true,
            error: 'Religion deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || `Could not delete religion with id ${id}`,
        });
    }
});

module.exports = router;
