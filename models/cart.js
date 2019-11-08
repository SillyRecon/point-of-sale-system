module.exports = function Cart(cart) {
    this.items = cart.items || [];
    this.itemCount = cart.itemCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;

    this.addtoCart = function(product) {
      if(this.items.find(o => o.barcode === product.barcode)){
        console.log("NO DOUBLE SCAN");
      }else{
        this.items.push(product);
        this.itemCount++;
        this.checkoutTotal+=product.price;
      }

    };

    this.removefromCart = function(barcode) {

    };

    this.getCart = function() {

    };
};
