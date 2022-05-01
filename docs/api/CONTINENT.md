[Go Back](./README.md)

# API Documentation for Continent

## GET `/api/continent/`

Get all continents from the database.

| Required | Parameter | Description                                     | Datatype  |
| -------- | --------- | ----------------------------------------------- | --------- |
|          | ids       | The ids of the continents you want to retrieve. | Number[ ] |

**Note**: If you don't specify any ids, all continents will be returned.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/continent/`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"continentID": 1,
			"continentName": "Africa",
			"continentPopulation": 1321000000,
			"continentSize": 30370000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 2,
			"continentName": "Asia",
			"continentPopulation": 4713681244,
			"continentSize": 44579000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 3,
			"continentName": "Europe",
			"continentPopulation": 748456328,
			"continentSize": 10180000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 4,
			"continentName": "North America",
			"continentPopulation": 502737585,
			"continentSize": 24709000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 5,
			"continentName": "South America",
			"continentPopulation": 436894486,
			"continentSize": 17840000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 6,
			"continentName": "Oceania",
			"continentPopulation": 45404832,
			"continentSize": 8525989,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

Send a GET request to `/api/continent/?ids=3,6`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"continentID": 3,
			"continentName": "Europe",
			"continentPopulation": 748456328,
			"continentSize": 10180000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"continentID": 6,
			"continentName": "Oceania",
			"continentPopulation": 45404832,
			"continentSize": 8525989,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

</details>
<br>

## POST `/api/continent/`

Create a new continent from the given data.

| Required | Parameter  | Description                                         | Datatype |
| -------- | ---------- | --------------------------------------------------- | -------- |
| ✓        | name       | The name of the continent you want to create.       | String   |
| ✓        | population | The population of the continent you want to create. | Number   |
| ✓        | size       | The size of the continent you want to create.       | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/continent/` with the following body:

```json
{
	"name": "Europe",
	"population": 748456328,
	"size": 10180000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"continentID": 9,
		"continentName": "Europe",
		"continentPopulation": 748456328,
		"continentSize": 10180000,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/continent/`

Edit the continent with the given id.

| Required | Parameter  | Description                                               | Datatype |
| -------- | ---------- | --------------------------------------------------------- | -------- |
| ✓        | id         | The id of the continent you want to edit.                 | Number   |
|          | name       | The new name of the continent you want to edit.           | String   |
|          | population | The updated population of the continent you want to edit. | Number   |
|          | size       | The updated size of the continent you want to edit.       | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/continent/` with the following body:

```json
{
	"id": 9,
	"population": 750000000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"continentID": 9,
		"continentName": "Europe",
		"continentPopulation": 750000000,
		"continentSize": 10180000,
		"createdAt": "1970-01-01T00:00:00.000Z",
		"updatedAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/continent/`

Delete the continent with the given id.

| Required | Parameter | Description                                 | Datatype |
| -------- | --------- | ------------------------------------------- | -------- |
| ✓        | id        | The id of the continent you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/continent/` with the following body:

```json
{
	"id": 9
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
