const Continent = require('../models/Continent');

exports.addContinents = async () => {
    await Continent.bulkCreate([
        { continentName: 'Africa', continentPopulation: '1321000000', continentSize: '30370000' },
        { continentName: 'Asia', continentPopulation: '4713681244', continentSize: '44579000' },
        { continentName: 'Europe', continentPopulation: '748456328', continentSize: '10180000' },
        { continentName: 'North America', continentPopulation: '502737585', continentSize: '24709000' },
        { continentName: 'South America', continentPopulation: '436894486', continentSize: '17840000' },
        { continentName: 'Oceania', continentPopulation: '45404832', continentSize: '8525989' },
        { continentName: 'Antarctica', continentPopulation: '4490', continentSize: '14200000' },
    ]);
};
