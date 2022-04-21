const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Currency = sequelize.define('currency', {
    currency_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    currency_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency_symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Currency;
