// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
chai.use(chaiHttp);
chai.should();
describe("Index", () => {
    // Test to get the index page
    it("It should get the index page", (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
         });        // Test to get the cart
    it("should get an empty cart", (done) => {
        chai.request(app)
            .get(`/yourCart`)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  done();
                });
         });
});
