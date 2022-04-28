//import dotenv
require('dotenv').config();

//Dependencies
const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const { sequelize, connectToMySQL } = require('./config/mysqlConnection');
const { connectToMongoDB } = require('./config/mongoConnection');
const { createBaseData } = require('./config/baseData');

//Variable declaration
const app = express();
const port = process.env.PORT || 3000;

//Models Import
const CityModel = require('./models/City');
const CurrencyModel = require('./models/Currency');
const ReligionModel = require('./models/Religion');
const ContinentModel = require('./models/Continent');
const LanguageModel = require('./models/Language');
const CountryModel = require('./models/Country');

// Middleware
app.use(express.json());
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        error: err.message,
    });
});
/* eslint-enable no-unused-vars */

// Routes
app.use('/api', require('./routes/api.js'));

// Serve static files from the Vue app
app.use(history());
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

(async () => {
    try {
        // Connects to MySQL
        await connectToMySQL();

        // Connects to MongoDB
        await connectToMongoDB();

        // Validate connection
        await sequelize.authenticate();
        // eslint-disable-next-line
        console.log('Connection has been established successfully to MySQL.');

        // Establish relations
        CountryModel.belongsToMany(ReligionModel, { through: 'countryReligion' });
        ReligionModel.belongsToMany(CountryModel, { through: 'countryReligion' });

        CountryModel.belongsToMany(ContinentModel, { through: 'countryContinent' });
        ContinentModel.belongsToMany(CountryModel, { through: 'countryContinent' });

        CountryModel.belongsToMany(LanguageModel, { through: 'countryLanguage' });
        LanguageModel.belongsToMany(CountryModel, { through: 'countryLanguage' });

        CurrencyModel.hasOne(CountryModel, { foreignKey: 'countryCurrencyID' });
        CountryModel.belongsTo(CurrencyModel, { foreignKey: 'countryCurrencyID' });

        CityModel.hasOne(CountryModel, { foreignKey: 'countryCapitalID' });
        CountryModel.belongsTo(CityModel, { foreignKey: 'countryCapitalID' });

        // Sync models
        await sequelize.sync({ alter: true });

        await createBaseData();

        app.listen(port, () => {
            // eslint-disable-next-line
            console.log(`Server is running on port ${port}\nAccess it on http://localhost:${port}`);
        });
    } catch (error) {
        // eslint-disable-next-line
        console.log(error);
    }
})();
