const express = require('express');
const router = express.Router();

const Currency = require('../models/Currency');

router.get('/', async (req, res) => {
    try {
        const currency = await Currency.create({
            currency_name: 'Euro',
            currency_symbol: '€',
        });
        console.log('created currency', currency);
    } catch (error) {
        console.log(error);
    }
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
