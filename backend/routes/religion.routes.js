const express = require('express');
const router = express.Router();

const Religion = require('../models/Religion');

router.get('/', async (req, res) => {
    const allReligions = await Religion.findAll({});
    console.log(allReligions);
    res.json({
        religions: allReligions,
    });
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const savedReligion = await Religion.create({
        religionName: name,
    });

    res.json(savedReligion);
});

router.put('/', async (req, res) => {
    const { oldName, newName } = req.body;
    const savedReligion = await Religion.update({ name: newName }, { where: { name: oldName } });
    res.json(savedReligion)
});

module.exports = router;
