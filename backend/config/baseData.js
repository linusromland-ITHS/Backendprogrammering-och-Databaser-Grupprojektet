// Models import
const ContinentModel = require('../models/Continent');
const CurrencyModel = require('../models/Currency');
const LanguageModel = require('../models/Language');
const ReligionModel = require('../models/Religion');
const CityModel = require('../models/City');
const CountryModel = require('../models/Country');

// JSON import
const continentsJSON = require('./data/continents.json');
const currenciesJSON = require('./data/currencies.json');
const languagesJSON = require('./data/languages.json');
const religionsJSON = require('./data/religions.json');
const citiesJSON = require('./data/cities.json');
const countriesJSON = require('./data/countries.json');

exports.createBaseData = async () => {
    await addContinents();
    await addCurrencies();
    await addLanguages();
    await addReligions();
    await addCities();
    await addCountries();
};

const addContinents = async () => {
    // Get all data from continents table
    const continents = await ContinentModel.findAll();

    // Check if there is any data in the table
    if (continents.length === 0) await ContinentModel.bulkCreate(continentsJSON);
};

const addCurrencies = async () => {
    // Get all data from currencies table
    const currencies = await CurrencyModel.findAll();

    // Check if there is any data in the table
    if (currencies.length === 0) await CurrencyModel.bulkCreate(currenciesJSON);
};

const addLanguages = async () => {
    // Get all data from languages table
    const languages = await LanguageModel.findAll();

    // Check if there is any data in the table
    if (languages.length === 0) await LanguageModel.bulkCreate(languagesJSON);
};

const addReligions = async () => {
    // Get all data from religions table
    const religions = await ReligionModel.findAll();

    // Check if there is any data in the table
    if (religions.length === 0) await ReligionModel.bulkCreate(religionsJSON);
};

const addCities = async () => {
    // Get all data from cities table
    const cities = await CityModel.findAll();

    // Check if there is any data in the table
    if (cities.length === 0) await CityModel.bulkCreate(citiesJSON);
};

const addCountries = async () => {
    const countryNames = await CountryModel.findAll();

    if (countryNames.length === 0) {
        // Add countries
        countriesJSON.forEach(async (country) => {
            const createdCountry = await CountryModel.create({
                countryName: country.countryName,
                countryPopulation: country.countryPopulation,
                countrySize: country.countrySize,
                countryDescription: country.countryDescription,
                countryDomain: country.countryDomain,
                countryFlagURL: country.countryFlagURL,
                countryCapitalID: country.countryCapitalID,
                countryCurrencyID: country.countryCurrencyID,
            });

            // Add country to religion
            await createdCountry.addReligion(
                await ReligionModel.findAll({
                    where: { religionID: country.religionTableName },
                }),
            );

            // Add country to language
            await createdCountry.addLanguage(
                await LanguageModel.findAll({
                    where: { languageID: country.languageTableName },
                }),
            );

            // Add country to continent
            await createdCountry.addContinent(
                await ContinentModel.findAll({
                    where: { continentID: country.continentTableName },
                }),
            );
        });
    }
};
