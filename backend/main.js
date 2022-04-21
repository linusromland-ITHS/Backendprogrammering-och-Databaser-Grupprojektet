//import dotenv
require('dotenv').config();

//Dependencies
const express = require('express');
const { sequelize, createDatabase } = require('./config/mysqlConnection');
const { addContinents } = require('./config/baseData');

//Variable declaration
const app = express();
const port = process.env.PORT || 3000;

//Models Import
const ReligionModel = require('./models/Religion');
const ContinentModel = require('./models/Continent');
const LanguageModel = require('./models/Language');
const CountryModel = require('./models/Country');

app.use(express.json());
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
        await sequelize.sync();

        // Add data
        await addContinents();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}\nAccess it on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

init();
