[Go Back](./README.md)

# API Documentation for Sea

## GET `/api/sea/`

Get all seas from the database.

| Required | Parameter               | Description                                                                | Datatype  |
| -------- | ----------------------- | -------------------------------------------------------------------------- | --------- |
|          | ids                     | The id of the sea(s) you want to fetch.                                    | String[ ] |
|          | name                    | The name of the sea or species you want to fetch.                          | String    |
|          | sizeInSquareKmMin       | The minimum size of the sea you want to fetch. In square kilometers (km²). | Number    |
|          | sizeInSquareKmMax       | The maximum size of the sea you want to fetch. In square kilometers (km²). | Number    |
|          | averageDepthInMetersMin | The minimum average depth of the sea you want to fetch. In meters (m).     | Number    |
|          | averageDepthInMetersMax | The maximum average depth of the sea you want to fetch. In meters (m).     | Number    |

**Note**:

-   If you don't include any parameters in your request, all seas will be returned.
-   When using any of the interval parameters, you **do not** need to include both the minimum and maximum value.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/sea/`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"_id": "6268440574fd7ab3f2cfeb8a",
			"seaName": "Atlantic Ocean",
			"seaSizeInSquareKm": 106500000,
			"seaAverageDepthInMeters": 3642,
			"seaSpecies": ["Great White Shark", "Sperm Whale", "Beluga Whale"],
			"__v": 0
		},
		{
			"_id": "62684a7e74fd7ab3f2cfeb90",
			"seaName": "Pacific Ocean",
			"seaSizeInSquareKm": 162500000,
			"seaAverageDepthInMeters": 4280,
			"seaSpecies": ["Humpback whale", "Orca"],
			"__v": 0
		}
	]
}
```

Send a GET request to `/api/sea/?name=Atlantic&sizeInSquareKmMin=96500000`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"_id": "6268440574fd7ab3f2cfeb8a",
			"seaName": "Atlantic Ocean",
			"seaSizeInSquareKm": 106500000,
			"seaAverageDepthInMeters": 3642,
			"seaSpecies": ["Great White Shark", "Sperm Whale", "Beluga Whale"],
			"__v": 0
		}
	]
}
```

</details>
<br>

## POST `/api/sea/`

Create a new sea from the given data.

| Required | Parameter            | Description                                                         | Datatype  |
| -------- | -------------------- | ------------------------------------------------------------------- | --------- |
| ✓        | name                 | The name of the sea you want to create.                             | String    |
| ✓        | sizeInSquareKm       | The size of the sea you want to create. In square kilometers (km²). | Number    |
| ✓        | averageDepthInMeters | The average depth of the sea you want to create. In meters (m).     | Number    |
| ✓        | species              | An array of the species living in the sea you want to create.       | String[ ] |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/sea/` with the following body:

```json
{
	"name": "Atlantic Ocean",
	"sizeInSquareKm": 106500000,
	"averageDepthInMeters": 3642,
	"species": ["Great White Shark", "Sperm Whale", "Beluga Whale"]
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"name": "Atlantic Ocean",
		"sizeInSquareKm": 106500000,
		"averageDepthInMeters": 3642,
		"species": ["Great White Shark", "Sperm Whale", "Beluga Whale"],
		"_id": "6268440574fd7ab3f2cfeb8a",
		"__v": 0
	}
}
```

</details>
<br>

## PUT `/api/sea/`

Edit the sea with the given id.

| Required | Parameter            | Description                                                               | Datatype  |
| -------- | -------------------- | ------------------------------------------------------------------------- | --------- |
| ✓        | id                   | The id of the sea you want to edit.                                       | String    |
|          | name                 | The new name of the sea you want to edit.                                 | String    |
|          | sizeInSquareKm       | The updated size of the sea you want to edit. In square kilometers (km²). | Number    |
|          | averageDepthInMeters | The updated average depth of the sea you want to edit. In meters (m).     | Number    |
|          | species              | An updated array of the species living in the sea you want to edit.       | String[ ] |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/sea/` with the following body:

```json
{
	"id": "6268440574fd7ab3f2cfeb8a",
	"name": "Indian Ocean"
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"seaName": "Indian Ocean",
		"seaSizeInSquareKm": 106500000,
		"seaAverageDepthInMeters": 3642,
		"seaSpecies": ["Great White Shark", "Sperm Whale", "Beluga Whale"],
		"_id": "6268440574fd7ab3f2cfeb8a",
		"__v": 0
	}
}
```

</details>
<br>

## DELETE `/api/sea/`

Delete the sea with the given id.

| Required | Parameter | Description                           | Datatype |
| -------- | --------- | ------------------------------------- | -------- |
| ✓        | id        | The id of the sea you want to delete. | String   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/sea/` with the following body:

```json
{
	"id": "6268440574fd7ab3f2cfeb8a"
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
