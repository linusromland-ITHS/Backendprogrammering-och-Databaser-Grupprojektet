[Go Back](./README.md)

# API Documentation for Country

## GET `/api/country/`

Get all countries from the database.

| Required | Parameter   | Description                                                                | Datatype |
| -------- | ----------- | -------------------------------------------------------------------------- | -------- |
| ✓        | name        | The name of the country you want to fetch.                                 | String   |
| ✓        | population  | The population number of the country you want to fetch.                    | Number   |
| ✓        | population  | The population number of the country you want to fetch.                    | Number   |
| ✓        | sizeMin     | The min size of the country you want to fetch. In square kilometers (km²). | Number   |
| ✓        | sizeMax     | The max size of the country you want to fetch. In square kilometers (km²). | Number   |
| ✓        | currencyID  | The id of the country's currency.                                          | Number   |
| ✓        | religionID  | The id of the religion id that you want to fetch.                          | Number   |
| ✓        | languageID  | The id of the language id that you want to fetch.                          | Number   |
| ✓        | continentID | The id of thef continent id that you want to fetch.                        | Number   |

**Note**:

-   If you don't include any parameters in your request, all countries will be returned.
-   When using any of the interval parameters, you **do not** need to include both the minimum and maximum value.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/country/`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"countryID": 3,
			"countryName": "United States of America",
			"countryPopulation": 320000000,
			"countrySize": 9833520,
			"countryDescription": "The United States of America (USA; an alternate spelling...",
			"countryDomain": "us",
			"countryFlagURL": "https://countryflagsapi.com/svg/us",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z",
			"countryCurrencyID": 3,
			"countryCapitalID": 3,
			"city": {
				"cityID": 3,
				"cityName": "New York",
				"cityPopulation": 80000000,
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"currency": {
				"currencyID": 3,
				"currencyName": "US dollar",
				"currencySymbol": "USD",
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"continents": [
				{
					"continentID": 4,
					"continentName": "North America",
					"continentPopulation": 502737585,
					"continentSize": 24709000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryContinent": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 3,
						"continentContinentID": 4
					}
				}
			],
			"religions": [
				{
					"religionID": 3,
					"religionName": "Christianity",
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryReligion": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 3,
						"religionReligionID": 3
					}
				}
			],
			"languages": [
				{
					"languageID": 3,
					"languageName": "English",
					"languageNativeSpeakers": 372900000,
					"languageTotalSpeakers": 1452000000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryLanguage": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 3,
						"languageLanguageID": 3
					}
				}
			]
		},
		{
			"countryID": 6,
			"countryName": "Sweden",
			"countryPopulation": 9557422,
			"countrySize": 449964,
			"countryDescription": "Sweden is a country in Northern Europe. It is the world's second-largest...",
			"countryDomain": "se",
			"countryFlagURL": "https://countryflagsapi.com/svg/se",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z",
			"countryCurrencyID": 6,
			"countryCapitalID": 6,
			"city": {
				"cityID": 6,
				"cityName": "Stockholm",
				"cityPopulation": 8000000,
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"currency": {
				"currencyID": 6,
				"currencyName": "Swedish Crown",
				"currencySymbol": "SEK",
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"continents": [
				{
					"continentID": 3,
					"continentName": "Europe",
					"continentPopulation": 748456328,
					"continentSize": 10180000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryContinent": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 6,
						"continentContinentID": 3
					}
				}
			],
			"religions": [
				{
					"religionID": 3,
					"religionName": "Christianity",
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryReligion": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 6,
						"religionReligionID": 3
					}
				}
			],
			"languages": [
				{
					"languageID": 6,
					"languageName": "Swedish",
					"languageNativeSpeakers": 9000000,
					"languageTotalSpeakers": 20000000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryLanguage": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 6,
						"languageLanguageID": 6
					}
				}
			]
		}
	]
}
```

Send a GET request to `/api/country/?religionID=4`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"countryID": 4,
			"countryName": "Indonesia",
			"countryPopulation": 263991379,
			"countrySize": 1904569,
			"countryDescription": "Indonesia is a country in Southeast Asia...",
			"countryDomain": "id",
			"countryFlagURL": "https://countryflagsapi.com/svg/id",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z",
			"countryCurrencyID": 4,
			"countryCapitalID": 4,
			"city": {
				"cityID": 4,
				"cityName": "Jakarta",
				"cityPopulation": 20000000,
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"currency": {
				"currencyID": 4,
				"currencyName": "Indonesian rupiah",
				"currencySymbol": "IDR",
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"continents": [
				{
					"continentID": 2,
					"continentName": "Asia",
					"continentPopulation": 4713681244,
					"continentSize": 44579000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryContinent": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 4,
						"continentContinentID": 2
					}
				}
			],
			"religions": [
				{
					"religionID": 4,
					"religionName": "Islam",
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryReligion": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 4,
						"religionReligionID": 4
					}
				}
			],
			"languages": [
				{
					"languageID": 4,
					"languageName": "Indonesian",
					"languageNativeSpeakers": 43600000,
					"languageTotalSpeakers": 199000000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryLanguage": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 4,
						"languageLanguageID": 4
					}
				}
			]
		},
		{
			"countryID": 5,
			"countryName": "Pakistan",
			"countryPopulation": 197015900,
			"countrySize": 88080,
			"countryDescription": "Pakistan is a country in South Asia...",
			"countryDomain": "pk",
			"countryFlagURL": "https://countryflagsapi.com/svg/pk",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z",
			"countryCurrencyID": 5,
			"countryCapitalID": 5,
			"city": {
				"cityID": 5,
				"cityName": "Islamabad",
				"cityPopulation": 12000000,
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"currency": {
				"currencyID": 5,
				"currencyName": "Pakistani rupee",
				"currencySymbol": "PKR",
				"createdAt": "1970-01-01T00:00:00.000Z",
				"updatedAt": "1970-01-01T00:00:00.000Z"
			},
			"continents": [
				{
					"continentID": 2,
					"continentName": "Asia",
					"continentPopulation": 4713681244,
					"continentSize": 44579000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryContinent": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 5,
						"continentContinentID": 2
					}
				}
			],
			"religions": [
				{
					"religionID": 4,
					"religionName": "Islam",
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryReligion": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 5,
						"religionReligionID": 4
					}
				}
			],
			"languages": [
				{
					"languageID": 5,
					"languageName": "Punjabi",
					"languageNativeSpeakers": 12000000,
					"languageTotalSpeakers": 32000000,
					"createdAt": "1970-01-01T00:00:00.000Z",
					"updatedAt": "1970-01-01T00:00:00.000Z",
					"countryLanguage": {
						"createdAt": "1970-01-01T00:00:00.000Z",
						"updatedAt": "1970-01-01T00:00:00.000Z",
						"countryCountryID": 5,
						"languageLanguageID": 5
					}
				}
			]
		}
	]
}
```

</details>
<br>

## POST `/api/country/`

Create a new country from the given data.

| Required | Parameter    | Description                                                             | Datatype  |
| -------- | ------------ | ----------------------------------------------------------------------- | --------- |
| ✓        | name         | The name of the country you want to create.                             | String    |
| ✓        | population   | The population number of the country you want to create.                | Number    |
| ✓        | size         | The size of the country you want to create. In square kilometers (km²). | Number    |
| ✓        | description  | The description of the country you want to create.                      | String    |
| ✓        | domain       | The new country's top domain.                                           | String    |
| ✓        | flagURL      | A URL to the flag of the country you want to create.                    | String    |
| ✓        | capitalID    | The id of the country's capital city.                                   | Number    |
| ✓        | currencyID   | The id of the country's currency.                                       | Number    |
| ✓        | religionIDs  | An array of religion ids that belong to the country.                    | Number[ ] |
| ✓        | languageIDs  | An array of language ids that belong to the country.                    | Number[ ] |
| ✓        | continentIDs | An array of continent ids that belong to the country.                   | Number[ ] |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/country/` with the following body:

```json
{
	"name": "Sweden",
	"population": 10250000,
	"size": 450295,
	"description": "Sweden is a Scandinavian nation with thousands of coastal islands and inland lakes.",
	"domain": ".se",
	"flagURL": "https://domain.com/se.png",
	"capitalID": 1,
	"currencyID": 1,
	"religionIDs": [1, 2],
	"languageIDs": [1, 2],
	"continentIDs": [1, 2]
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"countryID": 1,
		"countryName": "Sweden",
		"countryPopulation": 10250000,
		"countrySize": 450295,
		"countryDescription": "Sweden is a Scandinavian nation with thousands of coastal islands and inland lakes.",
		"countryDomain": ".se",
		"countryFlagURL": "https://domain.com/se.png",
		"countryCapitalID": 1,
		"countryCurrencyID": 1,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/country/`

Edit the country with the given id.

| Required | Parameter    | Description                                                                   | Datatype  |
| -------- | ------------ | ----------------------------------------------------------------------------- | --------- |
| ✓        | id           | The id of the country you want to edit.                                       | Number    |
|          | name         | The new name of the country you want to edit.                                 | String    |
|          | population   | The updated population number of the country you want to edit.                | Number    |
|          | size         | The updated size of the country you want to edit. In square kilometers (km²). | Number    |
|          | description  | The new description of the country you want to edit.                          | String    |
|          | domain       | The country's updated top domain.                                             | String    |
|          | flagURL      | The updated URL to the flag of the country you want to edit.                  | String    |
|          | capitalID    | The updated id of the country's capital city.                                 | Number    |
|          | currencyID   | The updated id of the country's currency.                                     | Number    |
|          | religionIDs  | An updated array of religion ids that belong to the country.                  | Number[ ] |
|          | languageIDs  | An updated array of language ids that belong to the country.                  | Number[ ] |
|          | continentIDs | An updated array of continent ids that belong to the country.                 | Number[ ] |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/country/` with the following body:

```json
{
	"id": 1,
	"name": "Konungariket Sverige"
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"countryID": 1,
		"countryName": "Konungariket Sverige",
		"countryPopulation": 10250000,
		"countrySize": 450295,
		"countryDescription": "Sweden is a Scandinavian nation with thousands of coastal islands and inland lakes.",
		"countryDomain": ".se",
		"countryFlagURL": "https://domain.com/se.png",
		"countryCapitalID": 1,
		"countryCurrencyID": 1,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/country/`

Delete the country with the given id.

| Required | Parameter | Description                               | Datatype |
| -------- | --------- | ----------------------------------------- | -------- |
| ✓        | id        | The id of the country you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a DELETE request to `/api/country/` with the following body:

```json
{
	"id": 1
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": 1
}
```

</details>
