const express = require('express');
const router = express.Router();

const SeaModel = require('../models/Sea');

/**
 * @api {get} /api/sea/ Get all seas
 */
router.get('/', async (req, res) => {
    const { ids, name, minSizeInSquareKm, maxSizeInSquareKm, minAverageDepthInMeters, maxAverageDepthInMeters } =
        req.body;

    let query = {};
    if (ids) query._id = ids;
    if (name && name.trim()) query.name = { $regex: name, $options: 'i' };
    if (minSizeInSquareKm) query.sizeInSquareKm = { $gte: minSizeInSquareKm };
    if (maxSizeInSquareKm)
        query.sizeInSquareKm = query.sizeInSquareKm
            ? { $lte: maxSizeInSquareKm, ...query.sizeInSquareKm }
            : { $lte: maxSizeInSquareKm };
    if (minAverageDepthInMeters) query.averageDepthInMeters = { $gte: minAverageDepthInMeters };
    if (maxAverageDepthInMeters)
        query.averageDepthInMeters = query.averageDepthInMeters
            ? { ...query.averageDepthInMeters, $lte: maxAverageDepthInMeters }
            : { $lte: maxAverageDepthInMeters };

    try {
        let allSeas = await SeaModel.find(query);

        if (allSeas.length < 1) {
            allSeas = await SeaModel.find({ species: { $regex: name, $options: 'i' } });
        }

        res.status(200).json({
            success: true,
            error: '',
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

    if (!name || name.trim().length < 1 || !sizeInSquareKm || !averageDepthInMeters || !species) {
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

        res.status(201).json({
            success: true,
            error: '',
            data: savedSea,
        });
    } catch (error) {
        if (error.message.includes('duplicate')) {
            return res.status(400).json({
                success: false,
                error: `Sea with name ${name} already exists`,
            });
        }

        res.status(500).json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    const { id, name, sizeInSquareKm, averageDepthInMeters, species } = req.body;

    if (!id) {
        return res.status(422).json({ success: false, error: 'Please include id' });
    }

    if ((!name || name.trim().length < 1) && !sizeInSquareKm && !averageDepthInMeters && !species) {
        return res.status(422).json({ success: false, error: 'Please include a field to update' });
    }

    try {
        const sea = await SeaModel.findById(id);

        if (!sea) {
            return res.status(404).json({
                success: false,
                error: `Sea with id ${id} could not be found`,
            });
        }

        if (name) sea.name = name;
        if (sizeInSquareKm) sea.sizeInSquareKm = sizeInSquareKm;
        if (averageDepthInMeters) sea.averageDepthInMeters = averageDepthInMeters;
        if (species) sea.species = species;

        const savedSea = await sea.save();

        res.status(200).json({
            success: true,
            error: '',
            data: savedSea,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(422).json({
            success: false,
            error: 'Please provide a sea ID',
        });
    }

    try {
        const deletedSea = await SeaModel.findByIdAndDelete(id);

        if (!deletedSea) {
            return res.status(404).json({ success: false, error: `Sea with id ${id} could not be found` });
        }

        res.status(200).json({ success: true, error: '', data: 1 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
