var chai = require('chai');
var Cart = require('../models/cart');

describe('Model', function () {


  //let cart = new Cart({items : [], itemCount: 0, checkoutTotal: 0});

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
              };

  beforeEach(function () {
    cart = new Cart({items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
    console.log(cart);

    });
  afterEach(function(done) {
    cart = new Cart({items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
    console.log(cart);
    done();
    });

  describe('Creating the cart with a null', function() {
    it('should get the current cart', function(done) {
      // Use your database here...
      chai.expect(function(){
          cart = new Cart(null);
       }).to.throw('You have given an null');
       done();

       });
    it('Creating a cart missing a kay', function(done) {
      // Use your database here...
      chai.expect(function(){
          cart = new Cart({itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
       }).to.throw("You have given a cart with improper properties");
       done();

       });
      it('should get the current cart2', function(done) {
        // Use your database here...
        chai.expect(function(){
            cart = new Cart({items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
        }).cart.itemCount.to.equal(0);
        done();

       });

    });



});
