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

/**
 * @api {delete} /api/city/ Delete a city
 */
router.delete('/', async (req, res) => {
    const { currencyID } = req.body;

    if (!currencyID) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a currency id.',
        });
    }

    try {
        const deletedCurrency = await CurrencyModel.destroy({ where: { currencyID } });

        if (!deletedCurrency) {
            return res.status(404).json({
                success: false,
                error: `Currency with id ${currencyID} could not be found`,
            });
        }

        res.json({ success: true, error: '', data: deletedCurrency });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                error: `Currency with id ${currencyID} could not be deleted because it is being used as a currency in a country.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || `Could not delete currency with id ${currencyID}`,
        });
    }
});

module.exports = router;
