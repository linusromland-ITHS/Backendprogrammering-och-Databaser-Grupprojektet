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
        // eslint-disable-next-line
        console.error.bind(
            console,
            'Error while connecting to MongoDB using the following mongoURL: "' + mongoURI + '"',
        ),
    );
    db.once('open', function () {
        // eslint-disable-next-line
        console.log('Connection has been established successfully to MongoDB.');
    });
};
