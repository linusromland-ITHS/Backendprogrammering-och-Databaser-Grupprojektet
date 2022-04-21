//import dotenv
require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const { sequelize, createDatabase } = require('./config/mysqlConnection');

const ReligionModel = require('./models/Religion');
const ContinentModel = require('./models/Continent');
const LanguageModel = require('./models/Language');
const CountryModel = require('./models/Country');

app.use('/api', require('./routes/api.js'));

const init = async () => {
    try {
        // Create db if it doesn't exist
        await createDatabase();

        // Validate connection
        await sequelize.authenticate();

        console.log('Connection has been established successfully to MySQL.');

        // // Establish relations
        CountryModel.belongsToMany(ReligionModel, { through: 'country_religion' });
        ReligionModel.belongsToMany(CountryModel, { through: 'country_religion' });

        CountryModel.belongsToMany(ContinentModel, { through: 'country_continent' });
        ContinentModel.belongsToMany(CountryModel, { through: 'country_continent' });

        CountryModel.belongsToMany(LanguageModel, { through: 'country_language' });
        LanguageModel.belongsToMany(CountryModel, { through: 'country_language' });

        // Sync models
        sequelize.sync();

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

init();
