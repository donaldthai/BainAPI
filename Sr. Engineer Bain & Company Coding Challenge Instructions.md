# Bain & Company Coding Challenge -- Queryable API

## Overview
This problem is designed to test the candidates ability to takle problemsets similar to those Bain Engineers face.  The instructions are left ambiguous  on purpose and are meant to give the developer freedom to design, implement, and test their API.  This should take around 2 hours to complete.

## Instructions
You have been asked to assist in the creation of an internal API for a national healthcare provider.  This provider has a set of inpatient prospective payment systems providers.  This dataset can be found here: https://s3-us-west-2.amazonaws.com/bain-coding-challenge/Inpatient_Prospective_Payment_System__IPPS__Provider_Summary_for_the_Top_100_Diagnosis-Related_Groups__DRG__-_FY2011.csv.  We want to implement an API that allows for various methods of querying this data.  

#### API:

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

#### The expected response is a JSON blob containing the list of providers meeting the criteria.  All query parameters are optional.  Min and Max fields are inclusive

```json
[
	{
		"Provider Name": "SOUTHEAST ALABAMA MEDICAL CENTER",
		"Provider Street Address": "1108 ROSS CLARK CIRCLE",
		"Provider City": "DOTHAN",
		"Provider State": "AL",
		"Provider Zip Code": "36301",	
		"Hospital Referral Region Description": "AL - Dothan",
		"Total Discharges": 91,
		"Average Covered Charges": "$32,963.07", 
		"Average Total Payments": 	"$5,777.24",
		"Average Medicare Payments": "$4,763.73"
	},
	{
		"Provider Name": "MARSHALL MEDICAL CENTER SOUTH",
		"Provider Street Address": "2505 U S HIGHWAY 431 NORTH",
		"Provider City": "BOAZ",
		"Provider State": "AL",
		"Provider Zip Code": "35957",	
		"Hospital Referral Region Description": "AL - Birmingham",
		"Total Discharges": 14,
		"Average Covered Charges": "$32,963.07", 
		"Average Total Payments": 	"$5,777.24",
		"Average Medicare Payments": "$4,763.73"
	}
	
]

```

## Deliverables
- An API endpoint that implements the url ending with `/providers`
- Every possible combination of query string parameters works
- Some datastore is used
- Your API returns valid JSON
- Automated tests (i.e. tests that can be run from command line)
- A writeup/README describing your architecture, solutions, and assumptions made.  Be as thorough as possible with your explination.

Once complete, please send a copy of all of your code to [ronald.brown@bain.com](mailto:ronald.brown@bain.com) as well as deploy your solution somewhere (Heroku is perfect if you want to go that route) and include a link to it in your email.

Good luck, if you have any questions please mail [ronald.brown@bain.com](mailto:ronald.brown@bain.com)

If you're having problems with database size on Heroku, use a smaller subset of the data and indicate it in your writeup.  Also provide example queries to this