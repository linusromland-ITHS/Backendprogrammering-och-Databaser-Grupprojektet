const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Religion = sequelize.define('religion', {
    religionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    religionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Religion;
