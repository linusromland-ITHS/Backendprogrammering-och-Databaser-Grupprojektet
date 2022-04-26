[Go Back](./README.md)

# API Documentation for Religion

## GET `/api/religion/`

Get all religions from the database.

<details>
<summary>Show/Hide Example</summary>

Send a GET request to `/api/religion/`:

Response:

```json
{
	"religions": [
		{
			"religionID": 1,
			"religionName": "Atheist",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"religionID": 2,
			"religionName": "Hinduism",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"religionID": 3,
			"religionName": "Christianity",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"religionID": 4,
			"religionName": "Islam",
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

</details>
<br>

## POST `/api/religion/`

Create a new religion from the given data.

| Required | Parameter | Description                                  | Datatype |
| -------- | --------- | -------------------------------------------- | -------- |
| ✓        | name      | The name of the religion you want to create. | String   |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/religion/` with the following body:

```json
{
	"name": "Christianity"
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"religionID": 1,
		"religionName": "Christianity",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/religion/`

Edit the religion with the given id.

| Required | Parameter | Description                                | Datatype |
| -------- | --------- | ------------------------------------------ | -------- |
| ✓        | id        | The id of the religion you want to update. | Number   |
|          | name      | The new name of the religion.              | String   |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/religion/` with the following body:

```json
{
	"id": 1,
	"name": "Islam"
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"religionID": 1,
		"religionName": "Islam",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/religion/`

Delete the religion with the given id.

| Required | Parameter | Description                                | Datatype |
| -------- | --------- | ------------------------------------------ | -------- |
| ✓        | id        | The id of the religion you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/religion/` with the following body:

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
