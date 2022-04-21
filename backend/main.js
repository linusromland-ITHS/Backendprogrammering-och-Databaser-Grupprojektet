//import dotenv
require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const { getConnection } = require('./mysqlConnection');

//Connect to SQL
getConnection();

app.use('/api', require('./routes/api.js'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
