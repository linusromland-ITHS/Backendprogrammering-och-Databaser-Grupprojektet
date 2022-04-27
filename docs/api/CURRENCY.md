[Go Back](./README.md)

# API Documentation for Currency

## GET `/api/currency/`

Get all currencies from the database.

| Required | Parameter | Description                                   | Datatype  |
| -------- | --------- | --------------------------------------------- | --------- |
|          | ids       | The ids of the currency you want to retrieve. | Number[ ] |

**Note**: If you don't specify any ids, all currencies will be returned.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/language/`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"currencyID": 3,
			"currencyName": "US dollar",
			"currencySymbol": "USD",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 4,
			"currencyName": "Indonesian rupiah",
			"currencySymbol": "IDR",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 5,
			"currencyName": "Pakistani rupee",
			"currencySymbol": "PKR",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 6,
			"currencyName": "Swedish Crown",
			"currencySymbol": "SEK",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 12,
			"currencyName": "Turkish lira",
			"currencySymbol": "TRY",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

Send a GET request to `/api/currency/` with the following body:

```json
{
	"ids": [3, 6, 12]
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"currencyID": 3,
			"currencyName": "US dollar",
			"currencySymbol": "USD",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 6,
			"currencyName": "Swedish Crown",
			"currencySymbol": "SEK",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"currencyID": 12,
			"currencyName": "Turkish lira",
			"currencySymbol": "TRY",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

</details>
<br>

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
