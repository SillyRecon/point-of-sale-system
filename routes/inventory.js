var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));



router.get('/', function (req, res) {
  console.log('Welcome to inventory');
});
//template query
//localhost:8080/inventory/add?barcode=BARCODE&name=NAME&markdown=MARKDOWN&price=PRICE&weight=WEIGHT&nmx[N items, M items at, X % off]&limit=N items
//
router.get('/add', function(req, res, next) {
  var product = {
    barcode : req.query.barcode,
    name : req.query.name,
    quantity: "0",
    price : parseFloat(req.query.price).toFixed(2),
    weight: parseFloat(req.query.weight).toFixed(2),
    markdown : parseFloat(req.query.markdown).toFixed(2),
    nITEMS : parseFloat(req.query.nmx[0]).toFixed(2),
    mITEMS : parseFloat(req.query.nmx[1]).toFixed(2),
    xPERC : parseFloat(req.query.nmx[2]).toFixed(2),
    limit : parseFloat(req.query.limit).toFixed(2)
  };

  if(products.find(o => o.barcode === product.barcode)){

    console.log("Item with that barcode is already present");

  }else{

    products.push(product);
    fs.writeFile("./inventory/products.json", JSON.stringify(products, null, 2), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }
  res.set('Content-Type', 'text/plain');
  res.send(200, product);

});

module.exports = router;
