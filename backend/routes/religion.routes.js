const express = require('express');
const router = express.Router();

const ReligionModel = require('../models/Religion');

/**
 * @api {get} /api/religion/ Get all religions
 */
router.get('/', async (req, res) => {
    const allReligions = await ReligionModel.findAll({});
    res.json({
        religions: allReligions,
    });
});

/**
 * @api {post} /api/religion/ Create a new religion
 */
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name || name.length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name',
        });
    }
    try {
        const savedReligion = await ReligionModel.create({
            religionName: name,
        });
        res.status(201).json({ success: true, error: '', data: savedReligion });
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
    const { religionID, name } = req.body;
    if (!name || name.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name',
        });
    }

    try {
        const foundReligion = await ReligionModel.findOne({ where: { religionID } });

        if (!foundReligion) {
            return res.status(404).json({
                success: false,
                error: `Religion with id ${religionID} could not be found`,
            });
        }

        const updatedReligion = await foundReligion.update({ religionName: name });

        res.json({ success: true, error: '', data: updatedReligion });
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
    const { religionID } = req.body;

    try {
        const deletedReligionID = await ReligionModel.destroy({ where: { religionID } });

        if (!deletedReligionID) {
            return res.status(404).json({
                success: false,
                error: `Religion with id ${religionID} could not be found`,
            });
        }


        res.json({ success: true, error: '', data: deletedReligionID });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || `Could not delete religion with id ${religionID}`
        });
    }
});

module.exports = router;
