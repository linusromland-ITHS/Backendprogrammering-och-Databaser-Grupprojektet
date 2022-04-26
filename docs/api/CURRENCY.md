[Go Back](./README.md)

# API Documentation for Currency

## POST `/api/currency/`

Create a new currency from the given data.

| Required | Parameter | Description                                    | Datatype |
| -------- | --------- | ---------------------------------------------- | -------- |
| ✓        | name      | The name of the currency you want to create.   | String   |
| ✓        | symbol    | The symbol of the currency you want to create. | String   |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/currency/` with the following body:

```json
{
	"name": "United States Dollar",
	"symbol": "USD"
}
```

Response:

```json
{
	"success": true,
	"data": {
		"currencyID": 1,
		"currencyName": "United States Dollar",
		"currencySymbol": "USD",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/currency/`

Edit the currency with the given id.

| Required | Parameter | Description                                | Datatype |
| -------- | --------- | ------------------------------------------ | -------- |
| ✓        | id        | The id of the currency you want to update. | Number   |
|          | name      | The new name of the currency.              | String   |
|          | symbol    | The new symbol of the currency.            | String   |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/currency/` with the following body:

```json
{
	"id": 1,
	"name": "US Dollar"
}
```

Response:

```json
{
	"success": true,
	"data": {
		"currencyID": 1,
		"currencyName": "US Dollar",
		"currencySymbol": "USD",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/currency/`

Delete the currency with the given id.

| Required | Parameter | Description                                | Datatype |
| -------- | --------- | ------------------------------------------ | -------- |
| ✓        | id        | The id of the currency you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/currency/` with the following body:

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
