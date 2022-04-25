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

/**
 * @api {put} /api/country/ Edits the country with the specified id
 */
router.put('/', async (req, res) => {
    const country = await CountryModel.findByPk(req.body.countryID);
    if (!country) {
        return res.status(404).json({
            success: false,
            error: 'Country not found.',
        });
    }

    if (
        !req.body.countryName &&
        !req.body.countryPopulation &&
        !req.body.countrySize &&
        !req.body.countryDescription &&
        !req.body.countryDomain &&
        !req.body.countryFlagURL &&
        !req.body.countryCapitalID &&
        !req.body.countryCurrencyID &&
        !req.body.countryReligionIDs &&
        !req.body.countryLanguageIDs &&
        !req.body.countryContinentIDs
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid countryName, countryPopulation, countrySize, countryDescription, countryDomain, countryFlagURL, countryCapitalID, countryCurrencyID, countryReligionIDs, countryLanguageIDs or countryContinentIDs',
        });
    }

    try {
        const updatedCountry = await country.update({
            countryName: req.body.countryName,
            countryPopulation: req.body.countryPopulation,
            countrySize: req.body.countrySize,
            countryDescription: req.body.countryDescription,
            countryDomain: req.body.countryDomain,
            countryFlagURL: req.body.countryFlagURL,
            countryCapitalID: req.body.countryCapitalID,
            countryCurrencyID: req.body.countryCurrencyID,
        });

        if (req.body.countryReligionIDs) {
            // Remove country's religions (M:N relationship)
            const religions = await updatedCountry.getReligions();
            updatedCountry.removeReligion(religions);

            // Add country's religions (M:N relationship)
            await updatedCountry.addReligion(
                await ReligionModel.findAll({
                    where: { religionID: req.body.countryReligionIDs },
                }),
            );
        }

        if (req.body.countryLanguageIDs) {
            // Remove country's languages (M:N relationship)
            const languages = await updatedCountry.getLanguages();
            updatedCountry.removeLanguage(languages);

            // Add country's languages (M:N relationship)
            await updatedCountry.addLanguage(
                await LanguageModel.findAll({
                    where: { languageID: req.body.countryLanguageIDs },
                }),
            );
        }

        if (req.body.countryContinentIDs) {
            // Remove country's continents (M:N relationship)
            const continents = await updatedCountry.getContinents();
            updatedCountry.removeContinent(continents);

            // Add country's continents (M:N relationship)
            await updatedCountry.addContinent(
                await ContinentModel.findAll({
                    where: { continentID: req.body.countryContinentIDs },
                }),
            );
        }

        res.json({
            success: true,
            error: '',
            data: updatedCountry,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The country ${req.body.countryName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
