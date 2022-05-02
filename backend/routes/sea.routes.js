const express = require('express');
const router = express.Router();

const SeaModel = require('../models/Sea');

/**
 * @api {get} /api/sea/ Get all seas
 */
router.get('/', async (req, res) => {
    const { ids, name, sizeInSquareKmMin, sizeInSquareKmMax, averageDepthInMetersMin, averageDepthInMetersMax } =
        req.query;

    let query = {};
    if (ids) query._id = ids;
    if (name && name.trim()) query.seaName = { $regex: name, $options: 'i' };
    if (sizeInSquareKmMin) query.seaSizeInSquareKm = { $gte: sizeInSquareKmMin };
    if (sizeInSquareKmMax)
        query.seaSizeInSquareKm = query.sizeInSquareKm
            ? { $lte: sizeInSquareKmMax, ...query.sizeInSquareKm }
            : { $lte: sizeInSquareKmMax };
    if (averageDepthInMetersMin) query.seaAverageDepthInMeters = { $gte: averageDepthInMetersMin };
    if (averageDepthInMetersMax)
        query.seaAverageDepthInMeters = query.averageDepthInMeters
            ? { ...query.averageDepthInMeters, $lte: averageDepthInMetersMax }
            : { $lte: averageDepthInMetersMax };

    try {
        let allSeas = await SeaModel.find(query);
        const seasCount = await SeaModel.count();
        if (allSeas.length < 1 && name && name.trim().length > 0) {
            allSeas = await SeaModel.find({ seaSpecies: { $regex: name, $options: 'i' } });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: { result: allSeas, count: seasCount },
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
            seaName: name,
            seaSizeInSquareKm: sizeInSquareKm,
            seaAverageDepthInMeters: averageDepthInMeters,
            seaSpecies: species,
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

        if (name) sea.seaName = name;
        if (sizeInSquareKm) sea.seaSizeInSquareKm = sizeInSquareKm;
        if (averageDepthInMeters) sea.seaAverageDepthInMeters = averageDepthInMeters;
        if (species) sea.seaSpecies = species;

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
