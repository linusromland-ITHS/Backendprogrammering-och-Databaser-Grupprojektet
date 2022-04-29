[Go Back](./README.md)

# API Documentation for Language

## GET `/api/language/`

Get all languages from the database.

| Required | Parameter | Description                                    | Datatype  |
| -------- | --------- | ---------------------------------------------- | --------- |
|          | ids       | The ids of the languages you want to retrieve. | Number[ ] |

**Note**: If you don't specify any ids, all languges will be returned.

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
			"languageID": 1,
			"languageName": "Standard Chinese",
			"languageNativeSpeakers": 929000000,
			"languageTotalSpeakers": 1118000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 2,
			"languageName": "Hindi",
			"languageNativeSpeakers": 343900000,
			"languageTotalSpeakers": 602200000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 3,
			"languageName": "English",
			"languageNativeSpeakers": 372900000,
			"languageTotalSpeakers": 1452000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 4,
			"languageName": "Indonesian",
			"languageNativeSpeakers": 43600000,
			"languageTotalSpeakers": 199000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 5,
			"languageName": "Punjabi",
			"languageNativeSpeakers": 12000000,
			"languageTotalSpeakers": 32000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 6,
			"languageName": "Swedish",
			"languageNativeSpeakers": 9000000,
			"languageTotalSpeakers": 20000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

Send a GET request to `/api/languges/?ids=1,4`:

Response:

```json
{
	"success": true,
	"error": "",
	"data": [
		{
			"languageID": 1,
			"languageName": "Standard Chinese",
			"languageNativeSpeakers": 929000000,
			"languageTotalSpeakers": 1118000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		},
		{
			"languageID": 4,
			"languageName": "Indonesian",
			"languageNativeSpeakers": 43600000,
			"languageTotalSpeakers": 199000000,
			"createdAt": "1970-01-01T00:00:00.000Z",
			"updatedAt": "1970-01-01T00:00:00.000Z"
		}
	]
}
```

</details>
<br>

## POST `/api/language/`

Create a new language from the given data.

| Required | Parameter      | Description                                                        | Datatype |
| -------- | -------------- | ------------------------------------------------------------------ | -------- |
| ✓        | name           | The name of the language you want to create.                       | String   |
| ✓        | nativeSpeakers | The amount of native speakers the langauge you want to create has. | Number   |
| ✓        | totalSpeakers  | The amount of total speakers the langauge you want to create has.  | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a POST request to `/api/language/` with the following body:

```json
{
	"name": "Norwegian",
	"nativeSpeakers": 5320000,
	"totalSpeakers": 7000000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"languageID": 1,
		"languageName": "Norwegian",
		"languageNativeSpeakers": 5320000,
		"languageTotalSpeakers": 7000000,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## PUT `/api/language/`

Edit the language with the given id.

| Required | Parameter      | Description                                            | Datatype |
| -------- | -------------- | ------------------------------------------------------ | -------- |
| ✓        | id             | The id of the language you want to update.             | Number   |
|          | name           | The new name of the language.                          | String   |
|          | nativeSpeakers | The updated amount of native speakers of the language. | Number   |
|          | totalSpeakers  | The updated amount of total speakers of the language.  | Number   |

<details>
<summary>Show/Hide Example</summary>

Send a PUT request to `/api/language/` with the following body:

```json
{
	"id": 1,
	"nativeSpeakers": 500000,
	"totalSpeakers": 550000
}
```

Response:

```json
{
	"success": true,
	"error": "",
	"data": {
		"languageID": 1,
		"languageName": "Norwegian",
		"languageNativeSpeakers": 500000,
		"languageTotalSpeakers": 550000,
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

</details>
<br>

## DELETE `/api/language/`

Delete the language with the given id.

| Required | Parameter | Description                                | Datatype |
| -------- | --------- | ------------------------------------------ | -------- |
| ✓        | id        | The id of the language you want to delete. | Number   |

<details>
<summary>Show/Hide Example</summary>
Send a DELETE request to `/api/language/` with the following body:

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
