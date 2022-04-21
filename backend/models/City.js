const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const City = sequelize.define('city', {
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_population: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = City;
