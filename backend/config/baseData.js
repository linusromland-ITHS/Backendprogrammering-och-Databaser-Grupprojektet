const Continent = require('../models/Continent');

const continentsJSON = [
    { continentName: 'Africa', continentPopulation: '1321000000', continentSize: '30370000' },
    { continentName: 'Asia', continentPopulation: '4713681244', continentSize: '44579000' },
    { continentName: 'Europe', continentPopulation: '748456328', continentSize: '10180000' },
    { continentName: 'North America', continentPopulation: '502737585', continentSize: '24709000' },
    { continentName: 'South America', continentPopulation: '436894486', continentSize: '17840000' },
    { continentName: 'Oceania', continentPopulation: '45404832', continentSize: '8525989' },
    { continentName: 'Antarctica', continentPopulation: '4490', continentSize: '14200000' },
];

exports.addContinents = async () => {
    // Get all data from continents table
    const continents = await Continent.findAll();

    // Extract only continent names
    const continentNames = continents.map((continent) => continent.continentName);

    if (continentsJSON.length !== continentNames.length) {
        // Add continents
        await Continent.bulkCreate(continentsJSON);
    }
};
