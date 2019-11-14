
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


router.get('/return/:barcode', function (req, res){
  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var weight = parseFloat(req.query.weight).toFixed(2);
  var quantity = parseFloat(req.query.quantity).toFixed(2);
  var barcode = req.params.barcode;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });
  if(!product[0]){
    console.log('Product does not exist');
    return;
  }
  if(product[0].byweight == 1 && weight <= 0){
    console.log('No weight provided');
    res.set('Content-Type', 'text/plain');
    res.send(200, cart);
    return;
  }else if(product[0].byweight == 0 && weight != 1){
    console.log('This item cannot have a weight other than 1');
    res.set('Content-Type', 'text/plain');
    res.send(200, cart);
    return;

  }
  cart.removefromCart(product[0].barcode, quantity, weight);
  req.session.cart = cart;
  res.set('Content-Type', 'text/plain');
  res.send(200, 'Welcome to the POS system');
});



router.get('/scan/:barcode', function(req, res, next) {
  var weight = parseFloat(req.query.weight).toFixed(2);
  var quantity = parseFloat(req.query.quantity).toFixed(2);
  //console.log(weight);
  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var barcode = req.params.barcode;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });
  if(!product[0]){
    console.log('Product does not exist');
    return;
  }
  if(product[0].byweight == 1 && weight <= 0){
    console.log('No weight provided');
    res.set('Content-Type', 'text/plain');
    res.send(200, cart);
    return;
  }else if(product[0].byweight == 0 && weight != 1){
    console.log('This item cannot have a weight other than 1');
    res.set('Content-Type', 'text/plain');
    res.send(200, cart);
    return;

  }
  //console.log(product);
  product[0].price = parseFloat(product[0].price).toFixed(2);
  product[0].byweight = parseFloat(product[0].byweight);
  product[0].markdown = parseFloat(product[0].markdown).toFixed(2);
  product[0].nITEMS = parseFloat(product[0].nITEMS);
  product[0].mITEMS = parseFloat(product[0].mITEMS);
  product[0].xPERC = parseFloat(product[0].xPERC).toFixed(2)
  product[0].limit = parseFloat(product[0].limit);
  cart.addtoCart({product : product[0], quantity : parseFloat(quantity), weight : parseFloat(weight), total: 0.0});
  req.session.cart = cart;
  //console.log('You are adding an item with the barcode : ' + barcode);
  res.set('Content-Type', 'text/plain');
  res.send(200, cart);
});



module.exports = router;
