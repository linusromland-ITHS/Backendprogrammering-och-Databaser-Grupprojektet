// Dependencies
const express = require('express');
const router = express.Router();
const CurrencyModel = require('../models/Currency');

/**
 * @api {post} /api/currency Create a new currency
 */
router.post('/', async (req, res) => {
    if (!req.body.currencyName || !req.body.currencySymbol) {
        return res.status(400).json({
            success: false,
            error: 'Please provide currency name and currency symbol',
        });
    }

    try {
        const currency = await CurrencyModel.create({
            currencyName: req.body.currencyName,
            currencySymbol: req.body.currencySymbol,
        });

        return res.status(201).json({
            success: true,
            data: currency,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `Currency ${error.errors[0].value} already exists`,
            });
        }

        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
