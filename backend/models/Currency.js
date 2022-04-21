const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Currency = sequelize.define('currency', {
    currencyID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    currencyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currencySymbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Currency;
