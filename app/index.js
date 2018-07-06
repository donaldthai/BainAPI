const express = require('express')
const app = express()
const port = (process.env.PORT || 5000)
const providers = require('./providers')
var info = "To get started, use the API: GET /providers?max_discharges=5&min_discharges=6&max_average_covered_charges=50000&min_average_covered_charges=40000&min_average_medicare_payments=6000&max_average_medicare_payments=10000&state=GA";

app.set('port', port)

app.get('/', (request, response) => {
  response.send(info);
})

app.get('/providers', (request, response) => {
  var result = providers.query(request.query);
  result.then(function(docs) {
    console.log(docs.docs);
    response.send(JSON.stringify(docs.docs));
  });
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
