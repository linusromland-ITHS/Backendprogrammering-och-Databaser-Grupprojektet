[//]: <> (If you add to the documentation, all dates should be "1970-01-01T00:00:00.000Z")

# API Documentation

## Use the API

All endpoints are accessible via `/api` followed by the endpoint name (e.g. `/api/city`).

All parameters are passed as a JSON object in the request body.

### Example request with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

```javascript
const request = await fetch('/api/city', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		name: 'New York',
		population: 8000000
	})
});

const result = await request.json();
```

Response format is always returned as a JSON object.

The format of the response is as follows:

```json
{
	"success": true,
	"error": "",
	"data": ["DATA_TO_BE_RETURNED"]
}
```

Here, _`success`_ is either `true` or `false`.
<br>
If _`success`_ is `true`, `error` is empty and the request was successful. Data is returned in `data`.
<br>
If _`success`_ is `false`, `error` contains the error message. Data is not returned.

## Available endpoints

Click on the links below to see the available endpoints.

-   [City](./CITY.md) - `/api/city`
-   [Continent](./CONTINENT.md) - `/api/continent`
-   [Country](./COUNTRY.md) - `/api/country`
-   [Currency](./CURRENCY.md) - `/api/currency`
-   [Language](./LANGUAGE.md) - `/api/language`
-   [Planet](./PLANET.md) - `/api/planet`
-   [Religion](./RELIGION.md) - `/api/religion`
-   [Sea](./SEA.md) - `/api/sea`
