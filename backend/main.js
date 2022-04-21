//import dotenv
require('dotenv').config();

const { getConnection } = require('./mysqlConnection');

//Connect to SQL
getConnection();
