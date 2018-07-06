# Solution - Bain Coding challenge

## Overview
This is my solution to the Bain coding challenge.

## Technical Notes
- NodeJS with Express for API endpoints
- PouchDB for a lightweight in-memory database
- IPPS.csv data was parsed into PouchDB beforehand
- No paging implemented for querying the API
- Returns a large dataset since there's no paging
- Unit tests created with Mocha and Chai
- Deployed to Heroku


## Other Notes
I wanted to keep a barebones lightweight API backend, so I chose NodeJS since I was a bit familiar with it already.

For the database, PouchDB was perfect since it's an in-memory database that could be setup easily and importing the csv data wasn't too bad either.

Unit tests are all positive tests at the moment. I know it's better to also include negative tests as well but ran short on time.

## Heroku Deployment

https://bainapi.herokuapp.com

## Usage

```
GET /providers?max_discharges=5&min_discharges=6&max_average_covered_charges=50000
&min_average_covered_charges=40000&min_average_medicare_payments=6000
&max_average_medicare_payments=10000&state=GA
```
**NOTE the line breaks are there just for readability.  In reality this is one long querystring**

| Parameter                       | Description                               |
|---------------------------------|-------------------------------------------|
| `max_discharges`                | The maximum number of Total Discharges    |
| `min_discharges`                | The minimum number of Total Discharges    |
| `max_average_covered_charges`   | The maximum Average Covered Charges       |
| `min_average_covered_charges`   | The minimum Average Covered Charges       |
| `max_average_medicare_payments` | The maximum Average Medicare Payment      |
| `min_average_medicare_payments` | The minimum Average Medicare Payment      |
| `state`                         | The exact state that the provider is from |

```
Sample Result:
[
  {
    "drgdefinition":"390 - G.I. OBSTRUCTION W/O CC/MCC","providerid":"450299","providername":"COLLEGE STATION MEDICAL CENTER","providerstreetaddress":"1604 ROCK PRAIRIE ROAD","providercity":"COLLEGE STATION","providerstate":"TX","providerzipcode":"77842","hospitalreferralregiondescription":"TX - Bryan","totaldischarges":12,"averagecoveredcharges":23275.66,"averagetotalpayments":4042.33,"averagemedicarepayments":3204,"_id":"100002","_rev":"1-652bce909bac902b55ca81d837e14416"
  }
]
```
