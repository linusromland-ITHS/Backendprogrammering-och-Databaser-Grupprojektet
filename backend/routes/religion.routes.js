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
            res.status(404).json({
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

module.exports = router;
