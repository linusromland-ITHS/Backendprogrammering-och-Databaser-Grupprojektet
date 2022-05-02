// Dependencies
const express = require('express');
const router = express.Router();
const CurrencyModel = require('../models/Currency');

/**
 * @api {get} /api/currency Gets all currencies
 */
router.get('/', async (req, res) => {
    const { ids } = req.query;

    try {
        if (ids) {
            const currencies = await CurrencyModel.findAll({
                where: { currencyID: ids.split(',') },
            });
            res.status(200).json({
                success: true,
                error: '',
                data: currencies,
            });
        } else {
            const currencies = await CurrencyModel.findAll();
            res.status(200).json({
                success: true,
                error: '',
                data: currencies,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {post} /api/currency Create a new currency
 */
router.post('/', async (req, res) => {
    const { name, symbol } = req.body;

    if (!name || name.trim().length < 1 || !symbol) {
        return res.status(400).json({
            success: false,
            error: 'Please provide currency name and currency symbol',
        });
    }

    try {
        const currency = await CurrencyModel.create({
            currencyName: name,
            currencySymbol: symbol,
        });

        return res.status(201).json({
            success: true,
            error: '',
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
    const { id, name, symbol } = req.body;

    const currency = await CurrencyModel.findByPk(id);
    if (!currency) {
        return res.status(404).json({
            success: false,
            error: 'Currency not found.',
        });
    }

    if ((!name || name.trim().length < 1) && !symbol) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid currencyName or currencySymbol.',
        });
    }

    try {
        const updatedCurrency = await currency.update({
            currencyName: name,
            currencySymbol: symbol,
        });
        res.status(200).json({
            success: true,
            error: '',
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
 * @api {delete} /api/currency/ Delete a currency
 */
router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a currency id.',
        });
    }

    try {
        const deletedCurrency = await CurrencyModel.destroy({ where: { currencyID: id } });

        if (!deletedCurrency) {
            return res.status(404).json({
                success: false,
                error: `Currency with id ${id} could not be found`,
            });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: deletedCurrency,
        });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                error: `Currency with id ${id} could not be deleted because it is being used as a currency in a country.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || `Could not delete currency with id ${id}`,
        });
    }
});

module.exports = router;
