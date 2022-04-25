//Dependencies import
const mongoose = require('mongoose');

//Variable declaration
const MONGODB = process.env.MONGODB || 'testDB';

/**
 * @name: connectToMongoDB
 * @description: Connects to MongoDB
 * @param: none
 */
exports.connectToMongoDB = async () => {
    const mongoURI = `mongodb://localhost:27017/${MONGODB}`;
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on(
        'error',
        console.error.bind(
            console,
            'Error while connecting to MongoDB using the following mongoURL: "' + mongoURI + '"',
        ),
    );
    db.once('open', function () {
        console.log('Connection has been established successfully to MongoDB.');
    });
};
