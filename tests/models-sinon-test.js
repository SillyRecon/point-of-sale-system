var sinon = require('sinon');
var cart = require('../models/cart');

describe('Model', function () {


  let object = {
                product : {
                            barcode : '22334443',
                            name : 'Cheese',
                            price : 2.00,
                            byweight: 1,
                            markdown : 0.20,
                            nITEMS : 4,
                            mITEMS : 2,
                            xPERC : 0.05,
                            limit : 6
                           },
                quantity : 1,
                weight : 1,
                total: 0.0
              },
        error = new Error({ error: "blah blah" }),
        res = {}, expectedResult;
        beforeEach(function () {
                  res = {
                          json: sinon.spy(),
                          status: sinon.stub().returns({ end: sinon.spy() })
                        };

                  this.moo = "I'm a cow.";

        });
        afterEach(function(done) {
          database.dropDatabase().then(function() {}).then(done, done);
        });

        describe('#save()', function() {
          it('should save User data to database', function(done) {
            // Use your database here...
          });
        });

        describe('#load()', function() {
          it('should load User data from database', function(done) {
            // Use your database here...
          });
        });



});
