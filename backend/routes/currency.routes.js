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

/**
 * @api {put} /api/currency/ Edits the currency with the given id
 */
router.put('/', async (req, res) => {
    const currency = await CurrencyModel.findByPk(req.body.currencyID);
    if (!currency) {
        return res.status(404).json({
            success: false,
            error: 'Currency not found.',
        });
    }

    if (!req.body.currencyName && !req.body.currencySymbol) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid currencyName or currencySymbol.',
        });
    }

    try {
        const updatedCurrency = await currency.update({
            currencyName: req.body.currencyName,
            currencySymbol: req.body.currencySymbol,
        });
        res.json({
            success: true,
            data: updatedCurrency,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `Currency ${error.errors[0].value} already exists`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
