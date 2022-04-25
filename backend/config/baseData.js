const Continent = require('../models/Continent');
const Currency = require('../models/Currency');
const Language = require('../models/Language');
const Religion = require('../models/Religion');
const City = require('../models/City');
const Country = require('../models/Country');

const continentsJSON = [
    { continentName: 'Africa', continentPopulation: '1321000000', continentSize: '30370000' },
    { continentName: 'Asia', continentPopulation: '4713681244', continentSize: '44579000' },
    { continentName: 'Europe', continentPopulation: '748456328', continentSize: '10180000' },
    { continentName: 'North America', continentPopulation: '502737585', continentSize: '24709000' },
    { continentName: 'South America', continentPopulation: '436894486', continentSize: '17840000' },
    { continentName: 'Oceania', continentPopulation: '45404832', continentSize: '8525989' },
    { continentName: 'Antarctica', continentPopulation: '4490', continentSize: '14200000' },
];

const currenciesJSON = [
    { currencyName: 'Renminbi', currencySymbol: 'CNY' },
    { currencyName: 'Indian rupee', currencySymbol: 'INR' },
    { currencyName: 'US dollar', currencySymbol: 'USD' },
    { currencyName: 'Indonesian rupiah', currencySymbol: 'IDR' },
    { currencyName: 'Pakistani rupee', currencySymbol: 'PKR' },
    { currencyName: 'Swedish Crown', currencySymbol: 'SEK' },
    { currencyName: 'Mexican peso', currencySymbol: 'MXN' },
    { currencyName: 'Brazilian real', currencySymbol: 'BRL' },
    { currencyName: 'Russian ruble', currencySymbol: 'RUB' },
    { currencyName: 'Japanese yen', currencySymbol: 'JPY' },
    { currencyName: 'South Korean won', currencySymbol: 'KRW' },
    { currencyName: 'Turkish lira', currencySymbol: 'TRY' },
];

const LanguageJSON = [
    { languageName: 'Standard Chinese', languageNativeSpeakers: '929000000', languageTotalSpeakers: '1118000000' },
    { languageName: 'Hindi', languageNativeSpeakers: '343900000', languageTotalSpeakers: '602200000' },
    { languageName: 'English', languageNativeSpeakers: '372900000', languageTotalSpeakers: '1452000000' },
    { languageName: 'Indonesian', languageNativeSpeakers: '43600000', languageTotalSpeakers: '199000000' },
    { languageName: 'Punjabi', languageNativeSpeakers: '12000000', languageTotalSpeakers: '32000000' },
    { languageName: 'Swedish', languageNativeSpeakers: '9000000', languageTotalSpeakers: '20000000' },
];

const religionJSON = [
    { religionName: 'Atheist' },
    { religionName: 'Hinduism' },
    { religionName: 'Christianity' },
    { religionName: 'Islam' },
];

const cityJSON = [
    { cityName: 'Beijing', cityPopulation: '210000000' },
    { cityName: 'New Delhi', cityPopulation: '160000000' },
    { cityName: 'New York', cityPopulation: '80000000' },
    { cityName: 'Jakarta', cityPopulation: '20000000' },
    { cityName: 'Islamabad', cityPopulation: '12000000' },
    { cityName: 'Stockholm', cityPopulation: '8000000' },
];

const countryJSON = [
    {
        countryName: 'China',
        countryPopulation: 1412600000,
        countrySize: 9596961,
        countryDescription:
            "China (Chinese: 中国; pinyin: Zhōngguó), officially the People's Republic of China (PRC; Chinese: 中华人民共和国; pinyin: Zhōnghuá Rénmín Gònghéguó), is a country in East Asia. It is the world's most populous country, with a population of more than 1.4 billion. China spans five geographical time zones and borders 14 countries, the second most of any country in the world after Russia. Covering an area of approximately 9.6 million square kilometers (3,700,000 sq mi), it is the world's third or fourth largest country. The country consists of 23 provinces, five autonomous regions, four municipalities, and two Special Administrative Regions (Hong Kong and Macau). The national capital is Beijing and the largest city is Shanghai.",
        countryDomain: 'cn',
        countryFlagURL: 'https://countryflagsapi.com/svg/cn',
        countryCapitalID: 1,
        countryCurrencyID: 1,
        languageTMP: 'Standard Chinese',
        continentTMP: 'Asia',
        religionTMP: 'Atheist',
    },
    {
        countryName: 'India',
        countryPopulation: 1324171354,
        countrySize: 3287263,
        countryDescription:
            "India (Hindi: भारत, Bāratā; English: India) is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world. It is bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast. It shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the northeast; and Myanmar (Burma) and Bangladesh to the east. India's massive and diverse population has led to significant social and political changes over the past three millennia. The country is a federal republic with a parliamentary system consisting of a President elected from amongst the country's states and a Vice President, a Member of Parliament from each state, and a Member of the Legislative Assembly from each union territory. India's states include 29 states and the union territories of Dadra and Nagar Haveli, Daman and Diu, Jammu and Kashmir, Ladakh, Lakshadweep, Puducherry, Sikkim, Tamil Nadu, and Telangana. The country's largest city is New Delhi, and its capital is Delhi. The country's second-largest city is Mumbai. The country's third-largest city is Chennai. The country's fourth-largest city is Kolkata. The country's fifth-largest city is Hyderabad. The country's sixth-largest city is Calcutta. The country's seventh-largest city is Bangalore. The country's eighth-largest city is Ahmedabad. The country's ninth-largest city is Indore. The country's tenth-largest city is Surat. The country's eleventh-largest city is Chandigarh. The country's twelfth-largest city is Coimbatore. The country's thirteenth-largest city is Vizag. The country's fourteenth-largest city is Lucknow. The country's fifteenth-largest city is Kalyan-Dombivali. The country's sixteenth-largest city is Bhopal. The country's seventeenth-largest city is Ahmedabad. The country's eighteenth-largest city is Indore. The country's nineteenth-largest city is Surat. The country's twentieth-largest city is Chandigarh. The country's twenty-first-largest city is Coim",
        countryDomain: 'in',
        countryFlagURL: 'https://countryflagsapi.com/svg/in',
        countryCapitalID: 2,
        countryCurrencyID: 2,
        languageTMP: 'Hindi',
        continentTMP: 'Asia',
        religionTMP: 'Hinduism',
    },
    {
        countryName: 'United States of America',
        countryPopulation: 320000000,
        countrySize: 9833520,
        countryDescription:
            "The United States of America (USA; an alternate spelling is the United States of America, the United States, the U.S.A., or the U.S.) is a country in the Northeastern and Mid-Atlantic regions of the Americas. It is the world's most populous country, with a population of over 328 million people. The state of Maine, the smallest state in the U.S., is the only state in the country with a population under one million. The capital is Washington, D.C., in the District of Columbia. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital. The state of Hawaii is the only state in the country with a capital at sea. The state of Alaska is the only state in the country without a capital.",
        countryDomain: 'us',
        countryFlagURL: 'https://countryflagsapi.com/svg/us',
        countryCapitalID: 3,
        countryCurrencyID: 3,
        languageTMP: 'English',
        continentTMP: 'North America',
        religionTMP: 'Christianity',
    },
    {
        countryName: 'Indonesia',
        countryPopulation: 263991379,
        countrySize: 1904569,
        countryDescription:
            "Indonesia is a country in Southeast Asia. It is the world's most populous country, with a population of over 26.4 million people. Indonesia is bounded by the Indian Ocean on the south, the Pacific Ocean on the southwest, and the Celebes Sea on the east. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Indonesia is the world's largest island country, with an area of about 3.3 million square kilometres",
        countryDomain: 'id',
        countryFlagURL: 'https://countryflagsapi.com/svg/id',
        countryCapitalID: 4,
        countryCurrencyID: 4,
        languageTMP: 'Indonesian',
        continentTMP: 'Asia',
        religionTMP: 'Islam',
    },
    {
        countryName: 'Pakistan',
        countryPopulation: 197015900,
        countrySize: 88080,
        countryDescription:
            "Pakistan is a country in South Asia. It is the world's second-largest country by total area, with an area of about 8,000,000 square kilometres (3,000,000 square miles). It is the world's largest country by land area, with an area of about 2,543,000 square kilometres (1,200,000 square miles). It is the world's largest country by population, with a population of 197.01 million people. The country is bordered by Afghanistan to the north, China to the northeast, India to the east, and the Arabian Sea to the southeast. The country has a total of 19 official languages, including English, Urdu, and Punjabi. Pakistan is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Pakistan is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Pakistan is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Pakistan is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Pakistan is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian.",
        countryDomain: 'pk',
        countryFlagURL: 'https://countryflagsapi.com/svg/pk',
        countryCapitalID: 5,
        countryCurrencyID: 5,
        languageTMP: 'Punjabi',
        continentTMP: 'Asia',
        religionTMP: 'Islam',
    },
    {
        countryName: 'Sweden',
        countryPopulation: 9557422,
        countrySize: 449964,
        countryDescription:
            "Sweden is a country in Northern Europe. It is the world's second-largest country by total area, with an area of about 4,500,000 square kilometres (1,972,000 square miles). It is the world's largest country by land area, with an area of about 2,543,000 square kilometres (1,200,000 square miles). It is the world's largest country by population, with a population of 9,557,422 people. The country is bordered by Finland to the north, Norway to the northeast, and the Baltic Sea to the east. The country has a total of 19 official languages, including Swedish, English, and Sami. Sweden is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Sweden is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Sweden is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Sweden is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Sweden is the world's largest island country, with an area of about 3.3 million square kilometres (1.4 million square miles). The country has a total of three larger islands, the Flores Islands, the Bali Islands, and the Java Islands. The country has five official languages: Bahasa Indonesia, English, and Indonesian. Sweden is the world's largest island country.",
        countryDomain: 'se',
        countryFlagURL: 'https://countryflagsapi.com/svg/se',
        countryCapitalID: 6,
        countryCurrencyID: 6,
        languageTMP: 'Swedish',
        continentTMP: 'Europe',
        religionTMP: 'Christianity',
    },
];

exports.createBaseData = async () => {
    await addContinents();
    await addCurrencies();
    await addLanguages();
    await addReligions();
    await addCities();
    await addCountries();
};

const addContinents = async () => {
    // Get all data from continents table
    const continents = await Continent.findAll();

    // Extract only continent names
    const continentNames = continents.map((continent) => continent.continentName);

    if (continentsJSON.length > continentNames.length) {
        // Add continents
        await Continent.bulkCreate(continentsJSON);
    }
};

const addCurrencies = async () => {
    // Get all data from currencies table
    const currencies = await Currency.findAll();

    // Extract only currency names
    const currencyNames = currencies.map((currency) => currency.currencyName);

    if (currenciesJSON.length > currencyNames.length) {
        // Add currencies
        await Currency.bulkCreate(currenciesJSON);
    }
};

const addLanguages = async () => {
    // Get all data from languages table
    const languages = await Language.findAll();

    // Extract only language names
    const languageNames = languages.map((language) => language.languageName);

    if (LanguageJSON.length > languageNames.length) {
        // Add languages
        await Language.bulkCreate(LanguageJSON);
    }
};

const addReligions = async () => {
    // Get all data from religions table
    const religions = await Religion.findAll();

    // Extract only religion names
    const religionNames = religions.map((religion) => religion.religionName);

    if (religionJSON.length > religionNames.length) {
        // Add religions
        await Religion.bulkCreate(religionJSON);
    }
};

const addCities = async () => {
    // Get all data from cities table
    const cities = await City.findAll();

    // Extract only city names
    const cityNames = cities.map((city) => city.cityName);

    if (cityJSON.length > cityNames.length) {
        // Add cities
        await City.bulkCreate(cityJSON);
    }
};

const addCountries = async () => {
    const countryNames = await Country.findAll();

    if (countryJSON.length > countryNames.length) {
        // Add countries
        countryJSON.forEach(async (Element) => {
            const country = await Country.create({
                countryName: Element.countryName,
                countryPopulation: Element.countryPopulation,
                countrySize: Element.countrySize,
                countryDescription: Element.countryDescription,
                countryDomain: Element.countryDomain,
                countryFlagURL: Element.countryFlagURL,
                countryCapitalID: Element.countryCapitalID,
                countryCurrencyID: Element.countryCurrencyID,
            });

            // Add country to religion
            await country.addReligion(
                await Religion.findAll({
                    where: { religionID: Element.religionTMP },
                }),
            );

            // Add country to language
            await country.addLanguage(
                await Language.findAll({
                    where: { languageID: Element.languageTMP },
                }),
            );

            // Add country to continent
            await country.addContinent(
                await Continent.findAll({
                    where: { continentID: Element.continentTMP },
                }),
            );
        });
    }
};
