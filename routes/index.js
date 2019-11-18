
var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');




router.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Welcome to the POS system');
  return;
});

router.get('/yourCart', function (req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
  res.set('Content-Type', 'text/plain');
  res.status(200).send(cart);
  return;

});

router.get('/yourCartTotal', function (req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Your total is ' + cart.getCheckOutTotal());
  return;

});


router.get('/return/:barcode', function (req, res){

  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var weight = parseFloat(req.query.weight).toFixed(2);
  var quantity = parseFloat(req.query.quantity).toFixed(2);
  var barcode = req.params.barcode;
  var cart = new Cart(req.session.cart ? req.session.cart : {items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });

  if(!product[0]){

    console.log('Product does not exist');
    return;
  }
  else if(product[0].byweight == 1 && weight <= 0){

    console.log('No weight provided');
    res.set('Content-Type', 'text/plain');
    res.status(200).send('No weight provided');
    return;

  }else if(product[0].byweight == 0 && weight != 1){

    console.log('This item cannot have a weight other than 1');
    res.set('Content-Type', 'text/plain');
    res.status(200).send('This item cannot have a weight other than 1');
    return;

  }
  else{

    cart.removefromCart(product[0].barcode, quantity, weight);
    req.session.cart = cart;
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Item(s) returned');
    return;

  }

});



router.get('/scan/:barcode', function(req, res, next) {

  var weight = parseFloat(req.query.weight).toFixed(2);
  var quantity = parseFloat(req.query.quantity).toFixed(2);
  var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  var barcode = req.params.barcode;
  var cart = new Cart(req.session.cart ? req.session.cart : {items : [],itemCount : 0, itemPoundsCount : 0,checkoutTotal : 0.0});
  var product = products.filter(function(item) {
    return item.barcode == barcode;
  });

  if(!product[0]){
    console.log('Product does not exist');
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Product does not exist');
    return;
  }

  if(product[0].byweight == 1 && weight <= 0){
    console.log('No weight provided');
    res.set('Content-Type', 'text/plain');
    res.status(200).send('No weight provided');
    return;
  }else if(product[0].byweight == 0 && weight != 1){
    console.log('This item cannot have a weight other than 1');
    res.set('Content-Type', 'text/plain');
    res.status(200).send('This item cannot have a weight other than 1');
    return;

  }else{
    product[0].price = parseFloat(product[0].price).toFixed(2);
    product[0].byweight = parseFloat(product[0].byweight);
    product[0].markdown = parseFloat(product[0].markdown).toFixed(2);
    product[0].nITEMS = parseFloat(product[0].nITEMS);
    product[0].mITEMS = parseFloat(product[0].mITEMS);
    product[0].xPERC = parseFloat(product[0].xPERC).toFixed(2)
    product[0].limit = parseFloat(product[0].limit);
    cart.addtoCart({product : product[0], quantity : parseFloat(quantity), weight : parseFloat(weight), total: 0.0});
    req.session.cart = cart;
    res.set('Content-Type', 'text/plain');
    res.status(200).send(cart);
    return;
  }

});



module.exports = router;
