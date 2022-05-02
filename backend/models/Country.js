const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Country = sequelize.define('country', {
    countryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    countryPopulation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    countrySize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    countryDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    countryDomain: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    countryFlagURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Country;
