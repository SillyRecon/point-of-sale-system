var fs = require('fs');
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./inventory/products.json', 'utf8'));



router.get('/', function (req, res) {
  console.log('Welcome to your shopping cart');
});
//template query
//localhost:8080/inventory/add?barcode=BARCODE&name=NAME&markdown=MARKDOWN&bypound=true/false&nmx[N items, M items at, X % off]&limit=N items
router.get('/add/', function(req, res) {
  var product = {
    barcode : req.query.barcode,
    name : req.query.name,
    markdown : req.query.markdown,
    bypound : req.query.bypound,
    nITEMS : req.query.nmx[0],
    mITEMS : req.query.nmx[1],
    xPERC : req.query.nmx[2],
    limit : req.query.limit
  };
  //var barcode = req.query.barcode;
  //var name = req.query.name;
  //var markdown = req.query.markdown;
  //var bypound = req.query.bypound;
  //var nmx = req.query.nmx;
  //var nx = req.query.nx;
  //var limit = req.query.limit;

  //console.log('You are adding a/an '+ name +' with the barcode: ' + barcode + ' ,is solid by the pound? ' + bypound
  //+ 'it has a special of: Buy ' + nmx[0] +'get'+ nmx[1] +'at' + nmx[2] + 'off or Buy ' + nx[0] + 'for' + nx[1]
  //+ '. Limit of ' + limit);

  // parse json
  //var jsonObj = JSON.parse(product);
  //console.log(jsonObj);
  // stringify JSON Object
  var jsonContent = JSON.stringify(product);
  console.log(jsonContent);
  //var json = JSON.parse(data);
  products.push(jsonContent);
  fs.writeFile("./inventory/products.json", JSON.stringify(products), function(err){
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });

});

module.exports = router;
