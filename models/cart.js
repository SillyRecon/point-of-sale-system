module.exports = function Cart(cart) {
    this.items = cart.items || [];
    this.itemCount = cart.itemCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;

    this.addtoCart = function(cartItem) {
      var item = this.items.find(o => o.product.barcode == cartItem.product.barcode);
      //If there is no item present in the cart
      if(!item)
        {
          //If the amount of items being added exceeds the product limit
          if(cartItem.product.limit < cartItem.quantity)
            {
              console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
            }
          //else the amount of items being added does not exceed the product limit
          else{
               //if the product has a buy N get M at X off special
               if(cartItem.product.nITEMS > 1 && cartItem.product.mITEMS > 0 &&
                 cartItem.product.xPERC < 0 && cartItem.product.xPERC <= 1)
                 {
                   //TODO
                   //Check if the quantity of the product being added is less than the qualifying
                   //N for the special to take affect
                   if(cartItem.product.nITEMS > cartItem.quantity){
                     for(i = 0; i <  cartItem.quantity; i++){
                       cartItem.total+=cartItem.product.price;
                     }
                     this.items.push(cartItem);
                   }
                   //the quantity of the product being added is greater than the qualifying
                   //N for the special to take affect
                   else{
                     //special variable that signfies the discount condition has been met
                     var discount = 0;
                     //A loop constrained by the quantity of the item being added
                     var i = 1;
                     while(i <= cartItem.quantity){
                       //
                       if(discount == cartItem.product.nITEMS){
                         for(j = 0; j < cartItem.product.mITEMS; j++){
                           if(i + j > cartItem.quantity){
                             break j;
                           }
                           cartItem.total+=cartItem.product.price - (cartItem.product.price - cartItem.product.xPREC);
                           i++;
                         }
                         discount = 0;
                       }
                       else{
                         cartItem.total+=cartItem.product.price;
                         discount++;
                         i++;
                       }
                      }
                      this.items.push(cartItem)
                     }
                  }
                else if(cartItem.product.nITEMS > 1
                       && cartItem.product.xPERC < 0 && cartItem.product.xPERC <= 1)
                       {
                         // TODO:
                         if(cartItem.quantity < cartItem.product.nITEMS){
                           for(i = 0; i <  cartItem.quantity; i++){
                             cartItem.total+=cartItem.product.price;
                           }
                           this.items.push(cartItem);
                         }
                         else{
                           var i = 1;
                           var discount = Math.floor(cartItem.quantity/cartItem.product.nITEMS);
                           while(i <= cartItem.quantity){
                             if(discount == 0){
                               cartItem.total+=cartItem.product.price;
                               i++;
                             }
                             else{
                               if(i%cartItem.product.nITEMS != 0){
                                 cartItem.total+=cartItem.product.price - (cartItem.product.price - cartItem.product.xPREC);
                                 i++;
                               }
                               else if(i%cartItem.product.nITEMS == 0){
                                 cartItem.total+=cartItem.product.price - (cartItem.product.price - cartItem.product.xPREC);
                                 i++;
                                 discount--;
                               }
                             }
                           }
                           this.items.push(cartItem);
                         }
                       }
              }
        }
      else{
           if(item.quantity + cartItem.quantity > item.product[0].limit)
             {
               console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
             }
           else{
                item.total = 0.0;
                //if the product has a buy N get M at X off special
                if(item.product.nITEMS > 1 && item.product.mITEMS > 0 &&
                 item.product.xPERC < 0 && item.product.xPERC <= 1)
                 {
                  //TODO
                  //Check if the quantity of the product being added is less than the qualifying
                  //N for the special to take affect
                  if(item.product.nITEMS >= cartItem.quantity + item.quantity)
                    {
                     for(i = 0; i <  cartItem.quantity + item.quantity; i++){
                         item.total+=cartItem.product.price;
                        }
                     item.quantity += cartItem.quantity;
                    }
                    //the quantity of the product being added is greater than the qualifying
                    //N for the special to take affect
                   else{
                        //special variable that signfies the discount condition has been met
                        var discount = 0;
                        //A loop constrained by the quantity of the item being added
                        var i = 1;
                        while(i <= cartItem.quantity + item.quantity){
                             //
                             if(discount == item.product.nITEMS)
                               {
                                for(j = 0; j < item.product.mITEMS; j++){
                                   if(i + j > cartItem.quantity + item.quantity)
                                     {
                                       break j;
                                     }
                                   item.total+=item.product.price - (item.product.price - item.product.xPREC);
                                   i++;
                                  }
                                  discount = 0;
                               }
                            else{
                                 item.total+=item.product.price;
                                 discount++;
                                 i++;
                                }
                             }
                             item.quantity += cartItem.quantity;
                      }
                  }
                 else if(cartItem.product.nITEMS > 1
                        && cartItem.product.xPERC < 0 && cartItem.product.xPERC <= 1)
                        {
                         // TODO:
                         if(cartItem.quantity + item.quantity < cartItem.product.nITEMS)
                          {
                           for(i = 0; i <  cartItem.quantity + item.quantity; i++){
                               item.total+=item.product.price;
                              }
                              item.quantity += cartItem.quantity;
                           }
                         else{
                              var i = 1;
                              var discount = Math.floor((cartItem.quantity+item.quantity)/item.product.nITEMS);
                              while(i <= cartItem.quantity+item.quantity){
                                   if(discount == 0)
                                     {
                                      item.total+=item.product.price;
                                      i++;
                                     }
                                   else{
                                        if(i%item.product.nITEMS != 0)
                                          {
                                           item.total+=item.product.price - (item.product.price - item.product.xPREC);
                                           i++;
                                          }
                                        else if(i%item.product.nITEMS == 0)
                                          {
                                           item.total+=item.product.price - (item.product.price - item.product.xPREC);
                                           i++;
                                           discount--;
                                          }
                                        }
                                    }
                               item.quantity += cartItem.quantity;
                            }
                        }
                }
          }

    };

    this.removefromCart = function(barcode, numtoRemove) {
      if(numtoRemove == 0){
        this.items = this.items.filter(function(o) { return o.product.barcode == barcode; });
      }
      else{
        var item = this.items.find(o => o.product.barcode == barcode);
        //item.total = 0.0;
        item.quantity -= numtoRemove;
        this.addtoCart(item);
      }

    };

    this.getCart = function() {
      if(this.items.length == 0){
        console.log('No items in the cart');
        return this.items;
      }
      else{
        return this.items
      }
    };

    this.getCheckOutTotal = function() {
      if(this.items.length == 0){
        console.log('No items in the cart');
        return this.items;
      }
      else{
        var total = 0.0
        for(i = 0; i < this.items.length; i++){
          total+=this.items[i].total;
        }
        return total;
      }
    };
};
