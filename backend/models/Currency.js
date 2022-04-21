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
        unique: true,
    },
    currencySymbol: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
});

module.exports = Currency;
