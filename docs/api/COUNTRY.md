[Go Back](./README.md)

# API Documentation for Country

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
