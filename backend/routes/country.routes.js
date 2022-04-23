// Dependencies
const express = require('express');
const router = express.Router();
const CountryModel = require('../models/Country');
const ContinentModel = require('../models/Continent');
const LanguageModel = require('../models/Language');
const ReligionModel = require('../models/Religion');

/**
 * @api {post} /api/country Create a new country
 */
router.post('/', async (req, res) => {
    if (
        !req.body.countryName ||
        !req.body.countryPopulation ||
        !req.body.countrySize ||
        !req.body.countryDescription ||
        !req.body.countryDomain ||
        !req.body.countryFlagURL ||
        !req.body.countryCapitalID ||
        !req.body.countryCurrencyID ||
        !req.body.countryReligionIDs ||
        req.body.countryReligionIDs.length < 1 ||
        !req.body.countryLanguageIDs ||
        req.body.countryLanguageIDs.length < 1 ||
        !req.body.countryContinentIDs ||
        req.body.countryContinentIDs.length < 1
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Insert new country into database
        const country = await CountryModel.create({
            countryName: req.body.countryName,
            countryPopulation: req.body.countryPopulation,
            countrySize: req.body.countrySize,
            countryDescription: req.body.countryDescription,
            countryDomain: req.body.countryDomain,
            countryFlagURL: req.body.countryFlagURL,
            countryCapitalID: req.body.countryCapitalID,
            countryCurrencyID: req.body.countryCurrencyID,
        });

        // Add country's religions (M:N relationship)
        await country.addReligion(
            await ReligionModel.findAll({
                where: { religionID: req.body.countryReligionIDs },
            }),
        );

        // Add country's languages (M:N relationship)
        await country.addLanguage(
            await LanguageModel.findAll({
                where: { languageID: req.body.countryLanguageIDs },
            }),
        );

        // Add country's continents (M:N relationship)
        await country.addContinent(
            await ContinentModel.findAll({
                where: { continentID: req.body.countryContinentIDs },
            }),
        );

        return res.status(201).json({
            success: true,
            data: country,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `Country ${error.errors[0].value} already exists`,
            });
        }

        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/country Delete a country
 */
router.delete('/', async (req, res) => {
    console.log(req.body.countryID);
    if (!req.body.countryID) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a country ID',
        });
    }

    try {
        // Delete country from database
        const country = await CountryModel.destroy({
            where: { countryID: req.body.countryID },
        });

        if (country === 0) {
            return res.status(404).json({
                success: false,
                error: 'Country not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                error: 'Country deleted',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
