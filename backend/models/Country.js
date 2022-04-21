const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const City = require('./City');
const Currency = require('./Currency');

const Country = sequelize.define('country', {
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_population: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    country_domain: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_flag_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_capital_id: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'city_id',
        },
    },
    country_currency_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Currency,
            key: 'currency_id',
        },
    },
});

module.exports = Country;
