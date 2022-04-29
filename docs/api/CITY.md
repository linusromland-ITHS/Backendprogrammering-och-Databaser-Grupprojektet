[Go Back](./README.md)

# API Documentation for City

## GET `/api/city/`

Get all cities from the database.

| Required | Parameter | Description                                 | Datatype  |
| -------- | --------- | ------------------------------------------- | --------- |
|          | ids       | The ids of the cities you want to retrieve. | Number[ ] |

**Note**: If you don't specify any ids, all cities will be returned.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/city/`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"cityID": 1,
			"cityName": "Beijing",
			"cityPopulation": 210000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 2,
			"cityName": "New Delhi",
			"cityPopulation": 160000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 3,
			"cityName": "New York",
			"cityPopulation": 80000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 4,
			"cityName": "Jakarta",
			"cityPopulation": 20000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 5,
			"cityName": "Islamabad",
			"cityPopulation": 12000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 6,
			"cityName": "Stockholm",
			"cityPopulation": 8000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

Send a GET request to `/api/city/?ids=3,6`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"cityID": 3,
			"cityName": "New York",
			"cityPopulation": 80000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"cityID": 6,
			"cityName": "Stockholm",
			"cityPopulation": 8000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

</details>
<br>

## POST `/api/city/`

Create a new city from the given data.

| Required | Parameter  | Description                                           | Datatype |
| -------- | ---------- | ----------------------------------------------------- | -------- |
| ✓        | name       | The name of the city you want to create.              | String   |
| ✓        | population | The population number of the city you want to create. | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/city/` with the following body:

```json
{
	"name": "Gothenburg",
	"population": 579000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"cityID": 1,
		"cityName": "Gothenburg",
		"cityPopulation": 579000,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/city/`

Edit the city with the given id.

| Required | Parameter  | Description                                | Datatype |
| -------- | ---------- | ------------------------------------------ | -------- |
| ✓        | id         | The id of the city you want to update.     | Number   |
|          | name       | The new name of the city.                  | String   |
|          | population | The updated population number of the city. | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/city/` with the following body:

```json
{
	"id": 1,
	"name": "Gothenburg",
	"population": 615000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"cityID": 1,
		"cityName": "Gothenburg",
		"cityPopulation": 615000,
		"createdAt": "1970-01-01T00:00:00.000Z",
		"updatedAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/city/`

Delete the city with the given id.

| Required | Parameter | Description                            | Datatype |
| -------- | --------- | -------------------------------------- | -------- |
| ✓        | id        | The id of the city you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a DELETE request to `/api/city/` with the following body:

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
