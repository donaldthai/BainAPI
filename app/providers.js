
//// TODO: We can require the csv file here so we can read it into the DB
const queryKeyes = {
  "discharges": "totaldischarges",
  "average_covered_charges": "averagecoveredcharges",
  "average_medicare_payments": "averagemedicarepayments",
  "state": "providerstate"
};

var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('ipps');
var csv = require("fast-csv");

function setupDB() {
  var line = 1;
  var regex = /[ ]*/g;
  var format = function (data) {
    var d = {};
    //formats csv data
    for (var prop in data) {
      var replaced = prop.replace(regex, "").toLowerCase();
      switch (prop) {
        case 'Total Discharges':
          d[replaced] = parseInt(data[prop]);
          break;
        case 'Average Covered Charges':
          d[replaced] = parseFloat(data[prop].replace("$", ""));
          break;
        case 'Average Total Payments':
          d[replaced] = parseFloat(data[prop].replace("$", ""));
          break;
        case 'Average Medicare Payments':
          d[replaced] = parseFloat(data[prop].replace("$", ""));
          break;
        default:
          d[replaced] = data[prop];
      }
    }

    return d;
  };

  csv.fromPath("IPPS.csv", {headers : true, trim: true})
    .on("data", function(data){
      var d = format(data);
      d["_id"] = "" + line;
      db.put(d);
      line++;
       //console.log(data);
   })
    .on("end", function(){
       console.log("done");

       db.createIndex({
         index: { fields: [
           'providerstate',
           'totaldischarges',
           'averagecoveredcharges',
           'averagetotalpayments',
           'averagemedicarepayments'
         ]}
       }).then(function() {
         console.log("done indexing");
       });
   });
}

// TODO: Refactor into tool....
//setupDB();

// - We can then read the csv into CouchDB
// - Create PouchDB instance
// - Create functions and queries the DB based on params
// | Parameter                       | Description                               |
// |---------------------------------|-------------------------------------------|
// | `max_discharges`                | The maximum number of Total Discharges    |
// | `min_discharges`                | The minimum number of Total Discharges    |
// | `max_average_covered_charges`   | The maximum Average Covered Charges       |,
// | `min_average_covered_charges`   | The minimum Average Covered Charges       |
// | `max_average_medicare_payments` | The maximum Average Medicare Payment      |
// | `min_average_medicare_payments` | The minimum Average Medicare Payment      |
// | `state`                         | The exact state that the provider is from |
/**
 * Build query for exact parameters we expect.
 * @param  {json} options parameters we received from api call.
 * @return {json}         PouchDB json query built.
 */
function buildQuery(options) {
  //console.log(options);
  var order = ['state', 'min_discharges', 'max_discharges',
  'max_average_covered_charges', 'min_average_covered_charges',
  'max_average_medicare_payments', 'min_average_medicare_payments'];
  var result = {};

  for (var param of order) {
    if (!options[param]) {
      continue;
    }

    switch (param) {
      case 'max_discharges':
        if (result[queryKeyes.discharges]) {
          result[queryKeyes.discharges]['$lte'] = parseInt(options[param]);
        } else {
          result[queryKeyes.discharges] = { '$lte': parseInt(options[param]) };
        }
        break;
      case 'min_discharges':
        if (result[queryKeyes.discharges]) {
          result[queryKeyes.discharges]['$gte'] = parseInt(options[param]);
        } else {
          result[queryKeyes.discharges] = { '$gte': parseInt(options[param]) };
        }
        break;
      case 'max_average_covered_charges':
        if (result[queryKeyes.average_covered_charges]) {
          result[queryKeyes.average_covered_charges]['$lte'] = parseFloat(options[param]);
        } else {
          result[queryKeyes.average_covered_charges] = { '$lte': parseFloat(options[param]) };
        }
        break;
      case 'min_average_covered_charges':
        if (result[queryKeyes.average_covered_charges]) {
          result[queryKeyes.average_covered_charges]['$gte'] = parseFloat(options[param]);
        } else {
          result[queryKeyes.average_covered_charges] = { '$gte': parseFloat(options[param]) };
        }
        break;
      case 'max_average_medicare_payments':
        if (result[queryKeyes.average_medicare_payments]) {
          result[queryKeyes.average_medicare_payments]['$lte'] = parseFloat(options[param]);
        } else {
          result[queryKeyes.average_medicare_payments] = { '$lte': parseFloat(options[param]) };
        }
        break;
      case 'min_average_medicare_payments':
        if (result[queryKeyes.average_medicare_payments]) {
          result[queryKeyes.average_medicare_payments]['$gte'] = parseFloat(options[param]);
        } else {
          result[queryKeyes.average_medicare_payments] = { '$gte': parseFloat(options[param]) };
        }
        break;
      case 'state':
        result[queryKeyes.state] = options[param];
        break;
    }
  }

  //console.log(result);
  return Object.keys(result).length > 0 ? { 'selector': result} : null;
}

/** // TODO: Add validation for params....
 * Queries the provider database with optional parameters.
 * @param  json options Optional parameters to filter.
 * @return promise         Promise object.
 */
function query(options) {
  var query = buildQuery(options);
  //console.log(query);
  var result;
  if (!query) {
    result = db.allDocs({include_docs: true});
  } else {
    //console.log(query);
    result = db.find(query);
  }

  return result;
}

module.exports.query = query
