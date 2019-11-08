
var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
//var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));



router.get('/', function (req, res) {
  console.log('Welcome to the POS system, your cart ')
});

router.get('/yourCart', function (req, res){
  console.log('Here is your cart');
});

router.get('/scan/:barcode', function(req, res, next) {
  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var barcode = req.params.barcode;
  console.log(barcode);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(products);
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });
  console.log(product);
  //console.log(cart);
  cart.addtoCart(product[0]);
  req.session.cart = cart;
  console.log(cart);
  console.log('You are adding an item with the barcode : ' + barcode);
  res.set('Content-Type', 'text/plain');
  res.send(200, 'HELLO')
  //res.send(product);
});

module.exports = router;
