const express = require('express');
const router = express.Router();

const SeaModel = require('../models/Sea');

router.get('/', async (req, res) => {
    try {
        const allSeas = await SeaModel.find();
        res.json({
            success: true,
            data: allSeas,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Something went wrong retrieving all seas',
        });
    }
});

router.post('/', async (req, res) => {
    const { name, sizeInSquareKm, averageDepthInMeters, species } = req.body;

    if (!name || !sizeInSquareKm || !averageDepthInMeters || !species) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        const sea = await new SeaModel({
            name,
            sizeInSquareKm,
            averageDepthInMeters,
            species,
        });

        const savedSea = await sea.save();

        res.status(201).json({ success: true, error: '', data: savedSea });
    } catch (error) {
        console.log('error', error.message.includes('duplicate'));
        console.log('error.name', error.name);

        if (error.message.includes('duplicate')) {
            return res.status(400).json({
                success: false,
                error: `Sea with name ${name} already exists`,
            });
        }

        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
