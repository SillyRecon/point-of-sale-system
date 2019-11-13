
var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
//var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));



router.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'Welcome to the POS system');
});

router.get('/yourCart', function (req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  res.set('Content-Type', 'text/plain');
  res.send(200, 'Welcome to the POS system');
});

router.get('/scan/:barcode', function(req, res, next) {
  var weight = parseFloat(req.query.weight).toFixed(2);
  var quantity = parseFloat(req.query.quantity).toFixed(2);
  console.log(weight);
  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var barcode = req.params.barcode;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });
  if(!product[0]){
    console.log('Product does not exist')
  }
  console.log(product);
  cart.addtoCart({product : product[0], quantity : quantity, total: 0.0});
  req.session.cart = cart;
  console.log('You are adding an item with the barcode : ' + barcode);
  res.set('Content-Type', 'text/plain');
  res.send(200, cart)
});



module.exports = router;
