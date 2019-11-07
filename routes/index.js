
var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));



router.get('/', function (req, res, next) {
  console.log('Welcome to your shopping cart')
});

router.get('/add/:barcode', function(req, res, next) {
  var barcode = req.params.barcode;
  console.log('You are adding an item with the barcode : ' + barcode);
});

module.exports = router;
