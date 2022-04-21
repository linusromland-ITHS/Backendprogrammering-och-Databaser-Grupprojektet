const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Continent = sequelize.define('continent', {
    continentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    continentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    continentPopulation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    continentSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Continent;
