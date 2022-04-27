[Go Back](./README.md)

# API Documentation for City

## GET `/api/city/`

Get cities from filter.

| Required | Parameter | Description                   | Datatype |
| -------- | --------- | ----------------------------- | -------- |
|          | ids       | The ids of the cities to get. | Number   |

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
