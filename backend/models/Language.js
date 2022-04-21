const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Language = sequelize.define('language', {
    languageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    languageName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    languageNativeSpeakers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    languageTotalSpeakers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Language;
