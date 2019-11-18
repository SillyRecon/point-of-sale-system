# Point-of-Sale-System
A simple point of sale system designed to fulfill the USe cases described in Pillar's CheckOut Order Kata


### Express JS Point of sale system using queries to add to the cart and access relevant information

#### Libraries used
├── npm
├── cookie-parser@1.4.4
├── datastore@1.8.2  extraneous
├── express@4.17.1
├── express-session@1.17.0
├── express-validator@6.2.0  extraneous
├── fs@0.0.1-security
├── morgan@1.9.1
├── nedb@1.8.0
├── nodemon@1.19.4  extraneous
└── path@0.12.7



#### Quick Guide for setting up the project

```sh
$ cd point-of-sale/
$ sudo apt install nodejs
$ npm install
$ npm test
$ npm start

```
#### Query Key

The properties of a query are set when:
-a word after a "/" is proceeded by a ":"
like so "localhost:8080/return/:BARCODE", BARCODE can be replaced with a string of numbers.
-a word is proceeded by "barcode="
like so "localhost:8080/inventory/add?barcode=BARCODE", BARCODE can be replaced with a string of numbers.

BARCODE = Can be a string of numbers and letters, helps identify the product.

NAME = Can be a string of numbers and letters, name of the product.

MARKDOWN = Can be a decimal between 0.0 and 0.99, decides if the products price will be reduced by a markdown.

byweight = must equal 0 or 1, decides if the item is priced by the pound.

PRICE = Can be a floating number, the price of the product per item or pound.

First nmx[] = Can be equal to 0 or above, if it is 0, the product does not have a special, else this value is the N in
"Buy N get M at X off" or "Buy N at X off".

Second nmx[] = Can be equal 0 or above, if it is 0 and the previous value is not 0, this value is ignored as the product has
a "Buy N at X off" special, else if the previous value is above 0, this product has a "Buy N get M at X off" special and this
value is the M.

Third nmx[] = Can be equal to 0.0 to 0.99, it is the X in a "Buy N at X off" or "Buy N get M at X off" special.

LIMIT = limits the item to a certain amount per customer.

QUANTITY = The amount of items you want to purchases.

WEIGHT = The weight of the items you want to add or remove.


#### After set up

Queries for Inventory (Adding and Removing from product pool):

INVENTORY ROOT - "localhost:8080/inventory/"

INVENTORY EMPTY - "localhost:8080/inventory/empty"

INVENTORY ADD - "localhost:8080/inventory/add?barcode=BARCODE&name=NAME&markdown=MARKDOWN&byweight=0or 1&price=PRICE&nmx[]=5&nmx[]=0&nmx[]=0.8&limit=LIMIT"

INVENTORY EDIT - "localhost:8080/inventory/edit?barcode=BARCODE&markdown=MARKDOWN&price=PRICE&nmx[]=5&nmx[]=0&nmx[]=0.8&limit=LIMIT"


Queries for Index (Adding and Removing from cart):

ROOT - "localhost:8080/"

YOUR CART - "localhost:8080/yourCart"

YOUR TOTAL - "localhost:8080/yourCartTotal"

RETURNING AN ITEM FROM CART - "localhost:8080/return/:BARCODE?weight=WEIGHT&quantity=QUANTITY"

ADDING AN ITEM TO CART - "localhost:8080/scan/:BARCODE?weight=WEIGHT&quantity=QUANTITY"
