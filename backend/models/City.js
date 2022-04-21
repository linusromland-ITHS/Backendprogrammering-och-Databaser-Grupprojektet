const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const City = sequelize.define('city', {
    cityID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cityName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cityPopulation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = City;
