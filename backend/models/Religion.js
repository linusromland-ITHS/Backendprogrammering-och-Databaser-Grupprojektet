const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const Religion = sequelize.define('religion', {
    religion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    religion_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Religion;
