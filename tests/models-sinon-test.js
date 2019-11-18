var chai = require('chai');
var Cart = require('../models/cart');

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
              };

  beforeEach(function () {
    cart = new Cart({items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});

    });
  afterEach(function(done) {
    cart = new Cart({items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
    done();
  });

  describe('Creating the cart', function() {
    it('should not create a cart with a null ', function(done) {
      chai.expect(function(){
          cart = new Cart(null);
       }).to.throw('You have given an null');
       done();

       });
    it('should not create a cart with missing a kay', function(done) {
      chai.expect(function(){
          cart = new Cart({itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
       }).to.throw("You have given a cart with improper properties");
       done();

       });
    it('the cart should be empty', function(done) {
      chai.expect(cart.itemCount).to.equal(0);
      done();
       });

    });
    describe('Adding to the cart', function() {
      it('Adding one object to the cart with a weight of 2, and checking the item count for pounds', function(done) {

        object.weight = 2;
        cart.addtoCart(object);
        chai.expect(cart.itemPoundsCount).to.equal(0);
        chai.expect(cart.getItemAmountsPOUND()).to.equal(2);
        done();
         });
      it('Adding two objects of the same type to the cart with a weight of 0.5, and checking the item count for pounds', function(done) {

          let object2 = {
                        product : {
                                    barcode : '22334443',
                                    name : 'Cheese',
                                    price : 2.00,
                                    byweight: 1,
                                    markdown : 0.0,
                                    nITEMS : 4,
                                    mITEMS : 0,
                                    xPERC : 0.05,
                                    limit : 20
                                   },
                        quantity : 10,
                        weight : 0.5,
                        total: 0.0
                      };
          let object3 = {
                        product : {
                                    barcode : '22334443',
                                    name : 'Cheese',
                                    price : 2.00,
                                    byweight: 1,
                                    markdown : 0.0,
                                    nITEMS : 4,
                                    mITEMS : 0,
                                    xPERC : 0.05,
                                    limit : 20
                                   },
                        quantity : 10,
                        weight : 0.5,
                        total: 0.0
                      };
          cart.addtoCart(object2);
          cart.addtoCart(object3);
          chai.expect(cart.getItemAmountsPOUND()).to.equal(10);
          done();
          });
          it('Adding two objects of the same type to the cart with a weight of 0.5, and checking the item count for pounds with no specials', function(done) {

            let object2 = {
                          product : {
                                      barcode : '22334443',
                                      name : 'Cheese',
                                      price : 2.00,
                                      byweight: 1,
                                      markdown : 0.0,
                                      nITEMS : 0,
                                      mITEMS : 0,
                                      xPERC : 0.00,
                                      limit : 20
                                     },
                          quantity : 10,
                          weight : 0.5,
                          total: 0.0
                        };
            let object3 = {
                          product : {
                                      barcode : '22334443',
                                      name : 'Cheese',
                                      price : 2.00,
                                      byweight: 1,
                                      markdown : 0.0,
                                      nITEMS : 0,
                                      mITEMS : 0,
                                      xPERC : 0.00,
                                      limit : 20
                                     },
                          quantity : 10,
                          weight : 0.5,
                          total: 0.0
                        };
            cart.addtoCart(object2);
            cart.addtoCart(object3);
            chai.expect(cart.getItemAmountsPOUND()).to.equal(10);
            done();
            });

      });
      describe('Removing from to the cart', function() {
        it('Removing one object to the cart with a weight of 2, and checking the item count for pounds', function(done) {

          object = {
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
                        weight : 2,
                        total: 0.0
                      };
          cart.addtoCart(object);
          chai.expect(cart.itemPoundsCount).to.equal(0);
          chai.expect(cart.getItemAmountsPOUND()).to.equal(2);
          cart.removefromCart(object.product.barcode, 1, 2);
          chai.expect(cart.getItemAmountsPOUND()).to.equal(0);
          done();
          });


      });




});
