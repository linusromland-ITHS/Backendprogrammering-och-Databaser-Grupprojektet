// Dependencies
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const CityModel = require('../models/City');
const CurrencyModel = require('../models/Currency');
const CountryModel = require('../models/Country');
const ContinentModel = require('../models/Continent');
const LanguageModel = require('../models/Language');
const ReligionModel = require('../models/Religion');

/**
 * @api {get} /countries Get all countries
 */
router.get('/', async (req, res) => {
    const {
        ids,
        name,
        populationMin,
        populationMax,
        sizeMin,
        sizeMax,
        religionID,
        continentID,
        languageID,
        currencyID,
    } = req.query;

    const conditions = {};
    const associationsConditions = [];

    if (ids) {
        conditions.countryID = { [Op.in]: ids.split(',') };
    }

    if (name && name.trim().length > 0) {
        conditions.countryName = {
            [Op.substring]: name.trim(),
        };
    }

    if (isFinite(populationMin) || isFinite(populationMax)) {
        const min = isFinite(populationMin) && populationMin > 0 ? populationMin : 0;
        const max = isFinite(populationMax) ? populationMax : Number.MAX_SAFE_INTEGER;
        conditions.countryPopulation = {
            [Op.between]: [min, max],
        };
    }

    if (isFinite(sizeMin) || isFinite(sizeMax)) {
        const min = isFinite(sizeMin) && sizeMin > 0 ? sizeMin : 0;
        const max = isFinite(sizeMax) ? sizeMax : Number.MAX_SAFE_INTEGER;
        conditions.countrySize = {
            [Op.between]: [min, max],
        };
    }

    if (languageID) {
        associationsConditions.push({
            model: LanguageModel,
            where: {
                languageID,
            },
        });
    }

    if (religionID) {
        associationsConditions.push({
            model: ReligionModel,
            where: {
                religionID,
            },
        });
    }

    if (continentID) {
        associationsConditions.push({
            model: ContinentModel,
            where: {
                continentID,
            },
        });
    }

    if (currencyID) conditions.countryCurrencyID = currencyID;

    try {
        let countries = await CountryModel.findAll({
            where: conditions,
            include: [
                CityModel,
                CurrencyModel,
                ContinentModel,
                ReligionModel,
                LanguageModel,
                ...associationsConditions,
            ],
        });

        const countriesCount = await CountryModel.count({
            include: [
                CityModel,
                CurrencyModel,
                ContinentModel,
                ReligionModel,
                LanguageModel,
                ...associationsConditions,
            ],
        });

        if (countries.length === 0 && name && name.trim().length > 0) {
            countries = await CountryModel.findAll({
                include: [
                    {
                        model: CityModel,
                        where: {
                            cityName: {
                                [Op.substring]: name.trim(),
                            },
                        },
                    },
                ],
            });
        }

        if (countries.length === 0 && name && name.trim().length > 0) {
            countries = await CountryModel.findAll({
                include: [
                    {
                        model: ReligionModel,
                        where: {
                            religionName: {
                                [Op.substring]: name.trim(),
                            },
                        },
                    },
                ],
            });
        }

        res.status(200).json({
            success: true,
            error: '',
            data: { result: countries, count: countriesCount },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

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
            error: 'Please provide all required fields',
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
                error: '',
                message: 'Country deleted',
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
            await updatedCountry.removeReligion(religions);

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
