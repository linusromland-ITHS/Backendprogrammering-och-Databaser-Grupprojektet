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
    const {
        name,
        population,
        size,
        description,
        domain,
        flagURL,
        capitalID,
        currencyID,
        religionIDs,
        languageIDs,
        continentIDs,
    } = req.body;

    if (
        !name ||
        name.trim().length < 1 ||
        !population ||
        !size ||
        !description ||
        !domain ||
        !flagURL ||
        !capitalID ||
        !currencyID ||
        !religionIDs ||
        religionIDs.length < 1 ||
        !languageIDs ||
        languageIDs.length < 1 ||
        !continentIDs ||
        continentIDs.length < 1
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Insert new country into database
        const country = await CountryModel.create({
            countryName: name,
            countryPopulation: population,
            countrySize: size,
            countryDescription: description,
            countryDomain: domain,
            countryFlagURL: flagURL,
            countryCapitalID: capitalID,
            countryCurrencyID: currencyID,
        });

        // Add country's religions (M:N relationship)
        await country.addReligion(
            await ReligionModel.findAll({
                where: { religionID: religionIDs },
            }),
        );

        // Add country's languages (M:N relationship)
        await country.addLanguage(
            await LanguageModel.findAll({
                where: { languageID: languageIDs },
            }),
        );

        // Add country's continents (M:N relationship)
        await country.addContinent(
            await ContinentModel.findAll({
                where: { continentID: continentIDs },
            }),
        );

        return res.status(201).json({
            success: true,
            error: '',
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
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a country ID',
        });
    }

    try {
        // Delete country from database
        const country = await CountryModel.destroy({
            where: { countryID: id },
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
    const {
        id,
        name,
        population,
        size,
        description,
        domain,
        flagURL,
        capitalID,
        currencyID,
        religionIDs,
        languageIDs,
        continentIDs,
    } = req.body;

    const country = await CountryModel.findByPk(id);
    if (!country) {
        return res.status(404).json({
            success: false,
            error: 'Country not found.',
        });
    }

    if (
        (!name || name.trim().length < 1) &&
        !population &&
        !size &&
        !description &&
        !domain &&
        !flagURL &&
        !capitalID &&
        !currencyID &&
        !religionIDs &&
        !languageIDs &&
        !continentIDs
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name, population, size, description, domain, flagURL, capitalID, currencyID, religionIDs, languageIDs or continentIDs',
        });
    }

    try {
        const updatedCountry = await country.update({
            countryName: name,
            countryPopulation: population,
            countrySize: size,
            countryDescription: description,
            countryDomain: domain,
            countryFlagURL: flagURL,
            countryCapitalID: capitalID,
            countryCurrencyID: currencyID,
        });

        if (religionIDs) {
            // Remove country's religions (M:N relationship)
            const religions = await updatedCountry.getReligions();
            updatedCountry.removeReligion(religions);

            // Add country's religions (M:N relationship)
            await updatedCountry.addReligion(
                await ReligionModel.findAll({
                    where: { religionID: religionIDs },
                }),
            );
        }

        if (languageIDs) {
            // Remove country's languages (M:N relationship)
            const languages = await updatedCountry.getLanguages();
            updatedCountry.removeLanguage(languages);

            // Add country's languages (M:N relationship)
            await updatedCountry.addLanguage(
                await LanguageModel.findAll({
                    where: { languageID: languageIDs },
                }),
            );
        }

        if (continentIDs) {
            // Remove country's continents (M:N relationship)
            const continents = await updatedCountry.getContinents();
            updatedCountry.removeContinent(continents);

            // Add country's continents (M:N relationship)
            await updatedCountry.addContinent(
                await ContinentModel.findAll({
                    where: { continentID: continentIDs },
                }),
            );
        }

        res.status(200).json({
            success: true,
            error: '',
            data: updatedCountry,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The country ${name} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
