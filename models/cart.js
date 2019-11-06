module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.itemCount = cart.itemCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;

    this.addtoCart = function(product, barcode) {

    };

    this.removefromCart = function(barcode) {

    };

    this.getCart = function() {

    };
};
