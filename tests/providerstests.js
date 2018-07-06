var expect = require('chai').expect;
var providers = require('../app/providers');
var datatest = require('./datatest.json');

// TODO: Not really the best way to test but we can take a subset to test
describe('Testing query() from PouchDB', () => {
  it('Pass in "state" param and check results are "CA", limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'state': 'CA'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect("CA").to.be.equal(doc.providerstate);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "min_discharges" param and check results are at least 11, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'min_discharges': '11'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.totaldischarges).to.be.above(10);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "max_discharges" param and check results are at most 11, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'max_discharges': '11'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.totaldischarges).to.be.below(12);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "min_average_covered_charges" param and check results are at least 22482, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'min_average_covered_charges': '22482'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.averagecoveredcharges).to.be.above(22481.99);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "max_average_covered_charges" param and check results are at most 22482, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'max_average_covered_charges': '22482'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.averagecoveredcharges).to.be.below(22482.01);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "min_average_medicare_payments" param and check results are at least 5372, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'min_average_medicare_payments': '5372'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.averagemedicarepayments).to.be.above(5371.99);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);

  it('Pass in "max_average_medicare_payments" param and check results are at most 5372, limit 1000 results', function() {
    // 1. ARRANGE
    var options = {
        'max_average_medicare_payments': '5372'
    };

    // 2. ACT
    var promise = providers.query(options);

    return promise.then(function(docs) {
      //console.log(docs)
      var limit = 1000;
      var count = 0;
      for (var doc of docs.docs) {
        //documents too many, so we check the first 1000
        if (count >= 1000) {
          break;
        }
        expect(doc.averagemedicarepayments).to.be.below(5372.01);
        count++;
      }
      //console.log("HI");
    });

    // 3. ASSERT
  }).timeout(120000);
});
