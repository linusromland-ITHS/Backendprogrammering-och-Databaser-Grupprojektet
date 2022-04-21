const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Language = sequelize.define('language', {
    language_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    language_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language_native_speakers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    language_total_speakers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Language;
