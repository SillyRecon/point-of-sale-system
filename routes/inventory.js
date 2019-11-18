var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var products;


/*Gets the current inventory without any updates */
router.get('/', function (req, res) {
  products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));
  console.log('Welcome to inventory');
  res.set('Content-Type', 'text/plain');
  res.send(200, products)
});


/*
Adds a new item to the inventory using the query paramaters to decided the properties of the items
barcode can be any string
name can be any  string
price must be a number
markdown, the amount all items will be discounted by, must be between 0.0 and 0.99
byweight must be 1 (meaning the items price is by the pound) or 0 (meaning the items price is not by the pound)
nITEMS, number of items required to qualify for a discount, must be greater than 0 or equal to it
mITEMS, number of items that will be discounted, if the qualifying nITEMS  has been met, if equal to 0, the discounted items will be nITEMSx
xPERC, amount the qualifying items will be discounted, must be between 0.0 and 0.99
template query
localhost:8080/inventory/add?barcode=BARCODE&name=NAME&markdown=MARKDOWN&byweight=1 or 0&price=PRICE&nmx[]=N.items&nmx[]=M.items&nmx[]=X percent&limit=limit items
*/
router.get('/add', function(req, res, next) {
  var product = {
    barcode : req.query.barcode,
    name : req.query.name,
    price : parseFloat(req.query.price).toFixed(2),
    byweight: req.query.byweight,
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


/*
Edits an item in the inventory (if found) using the query paramaters
barcode can be any string
price must be a number
markdown, the amount all items will be discounted by, must be between 0.0 and 0.99
byweight must be 1 (meaning the items price is by the pound) or 0 (meaning the items price is not by the pound)
nITEMS, number of items required to qualify for a discount, must be greater than 0 or equal to it
mITEMS, number of items that will be discounted, if the qualifying nITEMS  has been met, if equal to 0, the discounted items will be nITEMSx
xPERC, amount the qualifying items will be discounted, must be between 0.0 and 0.99
limit, a hard limit on the amount of items a customer can add to cart
template query
localhost:8080/inventory/edit?barcode=BARCODE&markdown=MARKDOWN&price=PRICE&nmx[]=N.items&nmx[]=M.items&nmx[]=X percent&limit=limit items
*/
router.get('/edit', function(req, res, next) {

  //Search for the item
  var item = products.find(o => o.barcode === req.query.barcode);
  //Check if item is not null
  if(item){
    //Set the new values
    item.price = req.query.price;
    item.markdown = req.query.markdown;
    item.nITEMS = req.query.nITEMS;
    item.mITEMS = req.query.mITEMS;
    item.xPERC = req.query.xPERC;
    item.limit = req.query.limit;
    //Write the edits to the file
    fs.writeFile("./inventory/products.json", JSON.stringify(products, null, 2), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

    console.log("Item edited");

  }else{
    console.log('Item not found');

  }
  res.set('Content-Type', 'text/plain');
  res.send(200, product);

});

/*
  Empties the inventory
*/
router.get('/empty', function(req, res, next) {
  products = [];
  fs.writeFile("./inventory/products.json", JSON.stringify(products, null, 2), function(err){
    if (err) throw err;
  });

  res.set('Content-Type', 'text/plain');
  res.send(200, products);

});

module.exports = router;
