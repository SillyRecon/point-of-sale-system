module.exports = function Cart(cart) {
    this.items = cart.items || [];
    this.itemCount = cart.itemCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;

    this.addtoCart = function(cartItem) {
      var item = this.items.find(o => o.product.barcode == cartItem.product.barcode);

      if(!item){
        if(cartItem.product.limit < cartItem.quantity){
          console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
        }else{
          if(cartItem.product.nITEMS > 1 && cartItem.product.mITEMS > 0 &&
             cartItem.product.xPERC < 0 && cartItem.product.xPERC < 1){
               //TODO
               if(cartItem.product.nITEMS > cartItem.quantity){
                 for(i = 0; i < cartItem.quantity; i++){
                   this.checkoutTotal+=cartItem.product.price;
                 }
               }else{
                 var discount = 0;
                 for(i = 0; i < cartItem.quantity; i++){
                   if(discount == 1){
                     this.checkoutTotal+=(cartItem.product.price - (cartItem.product.price * cartItem.product.xPERC));
                     i++;
                     discount = 0;
                   }
                   for(j = 0; j < cartItem.product.nITEMS; j++){
                     this.checkoutTotal+=cartItem.product.price;
                     i++;
                     discount = 1;
                   }
                 }
               }
             }else if(cartItem.product.nITEMS > 1
                && cartItem.product.xPERC < 0 && cartItem.product.xPERC < 1){
                  // TODO:
                }
        }
      }else{
        if(item.quantity + cartItem.quantity > item.product[0].limit){

        }else{
          if(cartItem.product.nITEMS > 1 && cartItem.product.mITEMS > 0 &&
             cartItem.product.xPERC < 0 && cartItem.product.xPERC < 1){
               //TODO
               
             }else if(cartItem.product[0].nITEMS > 1 && cartItem.product[0].mITEMS > 0
                && cartItem.product[0].xPERC < 1){
                  // TODO:
                }

        }

      }


    /**  if(this.items.find(o => o.barcode === product.barcode)){
        console.log("NO DOUBLE SCAN");
      }else{
        this.items.push(product);
        this.itemCount++;
        this.checkoutTotal+=product.price;
      }**/

    };

    this.removefromCart = function(barcode) {

    };

    this.getCart = function() {

    };
};
