[Go Back](./README.md)

# API Documentation for Planet

## GET `/api/planet/`

Get all planets from the database.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/planet/`:

Response:

```json
{
	"success": true,
	"data": [
		{
			"name": "Mars",
			"surfaceAreaInSquareKm": 1448000000,
			"distanceFromSunInKm": 211130000,
			"moons": ["Phobos", "Deimos"],
			"averageTemperatureInCelsius": -60,
			"radiusInKm": 3389,
			"massInKg": 6.39e23,
			"orbitalPeriodInDays": 686,
			"_id": "6268416474fd7ab3f2cfeb85",
			"__v": 0
		},
		{
			"_id": "6268481074fd7ab3f2cfeb8d",
			"name": "Earth",
			"surfaceAreaInSquareKm": 510100000,
			"distanceFromSunInKm": 150550000,
			"moons": ["Luna"],
			"averageTemperatureInCelsius": 15,
			"radiusInKm": 6378,
			"massInKg": 5.9722e24,
			"orbitalPeriodInDays": 365,
			"__v": 0
		}
	]
}
```

</details>
<br>

## POST `/api/planet/`

Create a new planet from the given data.

| Required | Parameter                   | Description                                                                    | Datatype  |
| -------- | --------------------------- | ------------------------------------------------------------------------------ | --------- |
| ✓        | name                        | The name of the planet you want to create.                                     | String    |
| ✓        | surfaceAreaInSquareKm       | The surface area of the planet you want to create. In square kilometers (km²). | Number    |
| ✓        | distanceFromSunInKm         | The planet you want to create's distance from the sun. In kilometers (km).     | Number    |
| ✓        | moons                       | An array of the planet you want to create's moons.                             | String[ ] |
| ✓        | averageTemperatureInCelsius | The average temperature of the planet you want to create. In celsius (°C).     | Number    |
| ✓        | radiusInKm                  | The radius of the planet you want to create. In kilometers (km).               | Number    |
| ✓        | massInKg                    | The mass of the planet you want to create. In kilograms (kg).                  | Number    |
| ✓        | orbitalPeriodInDays         | The planet you want to create's orbital period. In days.                       | Number    |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/planet/` with the following body:

```json
{
	"name": "Mars",
	"surfaceAreaInSquareKm": 1448000000,
	"distanceFromSunInKm": 211130000,
	"moons": ["Phobos", "Deimos"],
	"averageTemperatureInCelsius": -60,
	"radiusInKm": 3389,
	"massInKg": 6.39e23,
	"orbitalPeriodInDays": 686
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"name": "Mars",
		"surfaceAreaInSquareKm": 1448000000,
		"distanceFromSunInKm": 211130000,
		"moons": ["Phobos", "Deimos"],
		"averageTemperatureInCelsius": -60,
		"radiusInKm": 3389,
		"massInKg": 6.39e23,
		"orbitalPeriodInDays": 686,
		"_id": "6268416474fd7ab3f2cfeb85",
		"__v": 0
	}
}
```

</details>
<br>

## PUT `/api/planet/`

Edit the planet with the given id.

| Required | Parameter                   | Description                                                                          | Datatype  |
| -------- | --------------------------- | ------------------------------------------------------------------------------------ | --------- |
| ✓        | id                          | The id of the planet you want to edit.                                               | String    |
|          | name                        | The new name of the planet you want to edit.                                         | String    |
|          | surfaceAreaInSquareKm       | The updated surface area of the planet you want to edit. In square kilometers (km²). | Number    |
|          | distanceFromSunInKm         | The planet you want to edit's updated distance from the sun. In kilometers (km).     | Number    |
|          | moons                       | An updated array of the planet you want to edit's moons.                             | String[ ] |
|          | averageTemperatureInCelsius | The updated average temperature of the planet you want to edit. In celsius (°C).     | Number    |
|          | radiusInKm                  | The updated radius of the planet you want to edit. In kilometers (km).               | Number    |
|          | massInKg                    | The updated mass of the planet you want to edit. In kilograms (kg).                  | Number    |
|          | orbitalPeriodInDays         | The planet you want to edit's updated orbital period. In days.                       | Number    |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/planet/` with the following body:

```json
{
	"id": "6268416474fd7ab3f2cfeb85",
	"massInKg": 32,
	"orbitalPeriodInDays": 1
}
```

Response:

```json
{
	"success": true,
	"data": {
		"name": "Mars",
		"surfaceAreaInSquareKm": 1448000000,
		"distanceFromSunInKm": 211130000,
		"moons": ["Phobos", "Deimos"],
		"averageTemperatureInCelsius": -60,
		"radiusInKm": 3389,
		"massInKg": 32,
		"orbitalPeriodInDays": 1,
		"_id": "6268416474fd7ab3f2cfeb85",
		"__v": 0
	}
}
```

</details>
<br>

## DELETE `/api/planet/`

Delete the planet with the given id.

| Required | Parameter | Description                              | Datatype |
| -------- | --------- | ---------------------------------------- | -------- |
| ✓        | id        | The id of the planet you want to delete. | String   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/planet/` with the following body:

```json
{
	"id": "6268481074fd7ab3f2cfeb8d"
}
```

Response:

```json
{
	"success": true,
	"data": {
		"_id": "6268481074fd7ab3f2cfeb8d",
		"name": "Earth",
		"surfaceAreaInSquareKm": 510100000,
		"distanceFromSunInKm": 150550000,
		"moons": ["Luna"],
		"averageTemperatureInCelsius": 15,
		"radiusInKm": 6378,
		"massInKg": 5.9722e24,
		"orbitalPeriodInDays": 365,
		"__v": 0
	}
}
```

</details>
