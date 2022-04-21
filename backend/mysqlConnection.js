const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const { DataTypes } = require('sequelize');

let sequelize;

const MYSQLHOST = process.env.MYSQLHOST || 'localhost';
const MYSQLUSER = process.env.MYSQLUSER || 'root';
const MYSQLPASS = process.env.MYSQLPASS || '1234';
const MYSQLDB = process.env.MYSQLDB || 'testDB';

exports.getConnection = async () => {
    await createDatabase();
    sequelize = new Sequelize(`mysql://${MYSQLUSER}:${MYSQLPASS}@${MYSQLHOST}:3306/${MYSQLDB}`, {
        logging: false,
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully to MySQL.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
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

    const City = sequelize.define('city', {
        city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city_population: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

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

    const Country = sequelize.define('country', {
        country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_population: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        country_domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_flag_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_capital_id: {
            type: DataTypes.INTEGER,
            references: {
                model: City,
                key: 'city_id',
            },
        },
        country_currency_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Currency,
                key: 'currency_id',
            },
        },
    });

    Country.belongsToMany(Religion, { through: 'country_religion' });
    Religion.belongsToMany(Country, { through: 'country_religion' });

    Country.belongsToMany(Continent, { through: 'country_continent' });
    Continent.belongsToMany(Country, { through: 'country_continent' });

    Country.belongsToMany(Language, { through: 'country_language' });
    Language.belongsToMany(Country, { through: 'country_language' });

    sequelize.sync();
};

function createDatabase() {
    return new Promise((resolve) => {
        // Open the connection to MySQL server
        const connection = mysql.createConnection({
            host: MYSQLHOST,
            user: MYSQLUSER,
            password: MYSQLPASS,
        });

        // Run create database statement
        connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQLDB}`, () => {
            resolve();
        });

        // Close the connection
        connection.end();
    });
}

exports.sequelize = sequelize;
