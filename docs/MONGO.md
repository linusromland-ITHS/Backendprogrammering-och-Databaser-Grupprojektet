# MongoDB motivation

We decided to use MongoDB to store data about planets and seas. The reasoning behind this decision was that planets and seas have no relation to each other or the countries in our MYSQL database.

## Planet

The planet collection contains information about the planets in our solar system.

```json
{
	"planetName": {
		"type": "String",
		"required": true,
		"unique": true
	},
	"planetSurfaceAreaInSquareKm": {
		"type": "Number",
		"required": true
	},
	"planetDistanceFromSunInKm": {
		"type": "Number",
		"required": true
	},
	"planetMoons": {
		"type": "Array",
		"required": true
	},
	"planetAverageTemperatureInCelsius": {
		"type": "Number",
		"required": true
	},
	"planetRadiusInKm": {
		"type": "Number",
		"required": true
	},
	"planetMassInKg": {
		"type": "Number",
		"required": true
	},
	"planetOrbitalPeriodInDays": {
		"type": "Number",
		"required": true
	}
}
```
