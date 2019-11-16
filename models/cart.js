module.exports = function Cart(cart) {
    
    if(!cart)
      {
        throw "You have given an null";
      }
    else if(typeof(cart.items) === "undefined" ||
            typeof(cart.itemCount) === "undefined" || typeof(cart.itemPoundsCount) === "undefined" ||
            typeof(cart.checkoutTotal) === "undefined"){

            throw "You have given a cart with improper properties";
    }
    this.items = cart.items || [];
    this.itemCount = cart.itemCount || 0;
    this.itemPoundsCount = cart.itemPoundsCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;


    this.addtoCart = function(cartItem) {
      console.log('CartItem : ');
      console.log(cartItem);
      console.log('CART : ');
      console.log(this.items);

      var item = this.items.find(o => o.product.barcode == cartItem.product.barcode);
      //If there is no item present in the cart
      console.log('FOUND CART Item : ');
      console.log(item);
      if(!item)
        {
          //If the amount of items being added exceeds the product limit

          if(cartItem.product.limit < cartItem.quantity*cartItem.weight)
            {
              console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
            }
          //else the amount of items being added does not exceed the product limit
          else{
               //if the product has a buy N get M at X off special
               if(cartItem.product.nITEMS > 1 && cartItem.product.mITEMS > 0 &&
                 cartItem.product.xPERC > 0 && cartItem.product.xPERC <= 1)
                 {
                   console.log('HERE');
                   //TODO
                   //Check if the quantity of the product being added is less than the qualifying
                   //N for the special to take affect
                   if(cartItem.product.nITEMS > parseFloat(cartItem.quantity)*parseFloat(cartItem.weight))
                     {
                       for(i = 0; i <  cartItem.quantity*cartItem.weight; i+=cartItem.weight){
                         cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                         //cartItem.total+=cartItem.product.price;
                         }
                       console.log('here');
                       this.items.push(cartItem);
                       console.log(this.items);
                      }
                      //the quantity of the product being added is greater than the qualifying
                      //N for the special to take affect
                    else{
                         //special variable that signfies the discount condition has been met
                         var discount = 0;
                         //A loop constrained by the quantity of the item being added
                         var i = cartItem.weight;
                         while(i <= cartItem.quantity*cartItem.weight){
                             //
                            if(discount == cartItem.product.nITEMS)
                              {
                                loop:
                                for(j=0; j < cartItem.product.mITEMS; j++){
                                   if(i + j > cartItem.quantity)
                                     {
                                       console.log('loop broken');
                                       break loop;
                                     }
                                   console.log(parseFloat(cartItem.product.price)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC)));
                                   cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                   i+=cartItem.weight;
                                  }
                                 discount = 0;
                               }
                             else{
                                  cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                  discount+=cartItem.weight;
                                  i+=cartItem.weight;
                                 }
                             }
                          console.log('here2');
                          this.items.push(cartItem)
                          }
                       }
                    else if(cartItem.product.nITEMS > 1
                           && cartItem.product.xPERC > 0 && cartItem.product.xPERC <= 1)
                       {
                         // TODO:
                         if(cartItem.quantity*cartItem.weight < cartItem.product.nITEMS)
                           {
                             for(i = 0; i <  cartItem.quantity*cartItem.weight; i+=cartItem.weight){
                                 cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                }
                             console.log('here3');
                             this.items.push(cartItem);
                           }
                         else{
                              var i = 1;
                              var discount = Math.floor((cartItem.quantity*cartItem.weight)/cartItem.product.nITEMS);
                              console.log(discount);
                              while(i <= cartItem.quantity*cartItem.weight){
                                   if(discount == 0)
                                     {
                                       cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                       i+=cartItem.weight;
                                     }
                                   else{
                                        if(i%cartItem.product.nITEMS != 0)
                                          {
                                            console.log('Discount set');
                                            cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                            i+=cartItem.weight;
                                          }
                                        else if(i%cartItem.product.nITEMS == 0){
                                                console.log('Discount recieved');
                                                cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                                i+=cartItem.weight;
                                                discount--;
                                           }
                                        }
                                    }
                              console.log('here4');
                              this.items.push(cartItem);
                             }
                       }
                       console.log(this.items);
                    }

      }
      else{
           //console.log(item);

           if(item.quantity + cartItem.weight*cartItem.quantity > item.product.limit)
             {
               console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
             }
           else{
                item.total = 0.0;
                console.log(cartItem);
                //item.quantity = parseFloat(item.quantity);

                //if the product has a buy N get M at X off special
                if(item.product.nITEMS > 1 && item.product.mITEMS > 0 &&
                 item.product.xPERC > 0 && item.product.xPERC <= 1)
                 {
                  //TODO
                  //Check if the quantity of the product being added is less than the qualifying
                  //N for the special to take affect
                  if(item.product.nITEMS >= cartItem.quantity*cartItem.weight + item.quantity)
                    {
                      for(i = 0; i <  cartItem.quantity*cartItem.weight + item.quantity; i+=cartItem.weight){
                          item.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                        }
                      item.quantity+=cartItem.quantity*cartItem.weight;
                      console.log('here5');
                    }
                    //the quantity of the product being added is greater than the qualifying
                    //N for the special to take affect
                   else{
                        //special variable that signfies the discount condition has been met
                        var discount = 0;
                        //A loop constrained by the quantity of the item being added
                        var i = cartItem.weight;
                        while(i <= cartItem.quantity*cartItem.weight + item.quantity){
                             //
                             if(discount <= item.product.nITEMS)
                               {
                                loop:
                                for(j = 0; j < item.product.mITEMS; j+=cartItem.weight){
                                   if(i + j > cartItem.quantity*cartItem.weight + item.quantity)
                                     {
                                       break loop;
                                     }
                                   cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                   i+=cartItem.weight;
                                   }
                                 discount = 0;
                                }
                              else{
                                   item.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                   discount+=cartItem.weight;
                                   i+=cartItem.weight;
                                  }
                              }
                          item.quantity += cartItem.quantity*cartItem.weight;
                        }
                        item.quantity+=parseFloat(cartItem.quantity*cartItem.weight);
                        console.log('here6');

                  }
                 else if(item.product.nITEMS > 1
                        && item.product.xPERC > 0 && item.product.xPERC <= 1)
                        {
                         // TODO:
                         if(cartItem.quantity*cartItem.weight + item.quantity < cartItem.product.nITEMS)
                          {
                            for(i = 0; i <  cartItem.quantity*cartItem.weight + item.quantity; i+=cartItem.weight){
                                item.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                               }
                            item.quantity += cartItem.quantity*cartItem.weight;
                            console.log('here7');
                           }
                         else{
                              var i = cartItem.weight;
                              var discount = Math.floor((cartItem.quantity*cartItem.weight+item.quantity)/item.product.nITEMS);
                              while(i <= cartItem.quantity*cartItem.weight+item.quantity){
                                   if(discount == 0)
                                     {
                                       item.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                       i+=cartItem.weight;
                                     }
                                   else{
                                        if(i%item.product.nITEMS != 0)
                                          {
                                           cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                           i+=cartItem.weight;
                                          }
                                       else if(i%item.product.nITEMS == 0)
                                             {
                                              cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                              i+=cart.weight;
                                              discount--;
                                             }
                                        }
                                   }
                              item.quantity+=cartItem.quantity*cartItem.weight;
                              console.log('here8');
                            }

                        }
                }
          }

    };

    this.removefromCart = function(barcode, numtoRemove, weight) {
      if(numtoRemove == 0){
        //this.items = this.items.filter(function(o) { return o.product.barcode == barcode; });
      }
      else{
        var item = this.items.find(o => o.product.barcode == barcode);
        //item.total = 0.0;
        if(!item){
          console.log('Item no longer present');
          return;
        }
        console.log(numtoRemove*weight);
        if(item.quantity <= numtoRemove*weight)
          {
            console.log('here');
            console.log(barcode);
            this.items = this.items.filter(function(o) { return o.product.barcode != barcode; });
            console.log(this.items);
            return;
          }
        console.log('here2');
        console.log({product : item.product, quantity : Math.abs(numtoRemove) * -1, weight : weight, total: 0.0});
        this.addtoCart({product : item.product, quantity : Math.abs(numtoRemove) * -1, weight : weight, total: 0.0});
        console.log(this.items);

      }

    };

    /*Returns an array of items present in the cart, if the array this.items is
       empty(if its length is 0) the function will
       indicate the cart is empty through console, and return the empty array
       , else, there are items in the array so return said array*/
    this.getCart = function() {

      if(this.items.length == 0)
        {
          console.log('No items in the cart');
          return this.items;
        }
      else{
           return this.items
          }
    };
    /*Returns a number representing the total cost of all the items currently in the array this.items
      , if the array this.items is empty(if its length is 0) the function will
      indicate the cart is empty through console, and return 0
      , else, there are items in the array so loop through this.items and sum the totals of each item
      in the array*/
    this.getCheckOutTotal = function() {
      if(this.items.length == 0)
        {
          console.log('No items in the cart');
          return 0;
        }
      else{
            var total = 0.0
            for(i = 0; i < this.items.length; i++){
               total+=this.items[i].total;
               }
            return total;
          }
    };


    /*Updates the number of items, which are not priced by weight,
       , if the array this.items is empty(if its length is 0) the function will
       indicate the cart is empty through console, and return false
       , else, there are items in the array so loop through this.items
       , check if the current item is priced by weight, if not add it's quantity to count.
       Check if itemCount is zero, indicating no update made otherwise return true*/
    this.updateItemAmount = function() {
      if(this.items.length == 0)
        {
         console.log('No items in the cart');
         return false;
        }
      else{
        var count = 0
        for(i = 0; i < this.items.length; i++){
          if(this.items.product.byweight == '0')
            this.itemCount+=this.items[i].quantity;
        }
        if(this.itemCount == 0)
          {
            return false;
          }
        return true;
      }
    };

    /*Updates the number of items, which are priced by weight,
       , if the array this.items is empty(if its length is 0) the function will
       indicate the cart is empty through console, and return false
       , else, there are items in the array so loop through this.items
       , check if the current item is priced by weight, if so add it's quantity to count.
       Check if itemCount is zero, indicating no update made otherwise return true*/
    this.updatePoundAmount = function() {
      if(this.items.length == 0)
        {
          console.log('No items in the cart');
          return false;
        }
      else{
           for(i = 0; i < this.items.length; i++){
              if(this.items[0].product.byweight == '1')
                 this.itemCount+=this.items[i].quantity;
              }
           if(this.itemPoundsCount == 0)
             {
              return false;
             }
           return true;
          }
    };

    /*Returns the amount in pounds of items present in the cart. If a call to
      updatePoundAmount (this will automatically update the amount) returns false it
      means no items measured in pounds present in this.items so return 0,
      else there are items measured in pounds so return this.itemPoundsCount*/
    this.getItemAmountsPOUND = function(){
      if(this.updatePoundAmount == false){
        return 0;
      }
      else{
        return this.itemPoundsCount;
      }
    };
    /*Returns the amount of items present in the cart that are not measured in pounds. If a call to
      updateItemAmount (this will automatically update the amount) returns false it
      means no items not measured in pounds present in this.items so return 0,
      else there are items not measured in pounds so return this.itemCount*/
    this.getItemAmountsNonPOUND = function(){
      if(this.updateItemAmount == false){
        return 0;
      }
      else{
        return this.itemCount;
      }
    };
    /*Returns an array of length 2 with the amount of items not measured in pounds
      in the first index and the amount of items measured in pounds in the second index*/
    this.getItemAmountBOTH = function(){

      return [this.getItemAmountsCOUNT, this.getItemAmountsNonPOUND];
    };
};
