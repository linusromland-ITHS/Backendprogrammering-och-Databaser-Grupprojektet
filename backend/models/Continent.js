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
        unique: true,
    },
    continentPopulation: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    continentSize: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
});

module.exports = Continent;
