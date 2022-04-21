const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Continent = sequelize.define('continent', {
    continent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    continent_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    continent_population: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    continent_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Continent;
