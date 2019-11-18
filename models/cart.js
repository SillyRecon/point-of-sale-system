/*A model for a cart object to be used to keep track of items added to model.
  The model needs a cart object with the following properties:
  - An array called "items", used to hold each item added to the cart
  - A number variable called itemCount counting the number of items not measured in pounds
  - A number variable called itemPoundsCount counting the number of items measured in pounds
  - A number variable called checkoutTotal counting the total at checkout*/

module.exports = function Cart(cart) {

    /*Checks to ensure the Cart object provided is not null or if its properties
      are invalid*/
    if(!cart)
      {
        throw "You have given an null";
      }
    else if(typeof(cart.items) === "undefined" ||
            typeof(cart.itemCount) === "undefined" || typeof(cart.itemPoundsCount) === "undefined" ||
            typeof(cart.checkoutTotal) === "undefined"){

            throw "You have given a cart with improper properties";
    }
    /*Set the instance variables*/
    this.items = cart.items || [];
    this.itemCount = cart.itemCount || 0;
    this.itemPoundsCount = cart.itemPoundsCount || 0;
    this.checkoutTotal = cart.checkoutTotal || 0;

    /*Takes a item object and adds it to the cart provided it is not null and has the required properties */
    this.addtoCart = function(cartItem) {
      //Check if the item is null, if so, throw an error
      if(!cartItem)
        {
          throw "You have given an null";
        }
      //Else if the items properties are undefined throw error
      else if(typeof(cartItem.product) === "undefined" ||
              typeof(cartItem.quantity) === "undefined" || typeof(cartItem.weight) === "undefined" ||
              typeof(cartItem.total) === "undefined"){

              throw "You have given a item with improper properties";
      }
      //Set the item total to zero if it already isnt (The add function will overwrite it)
      else if(cartItem.total != 0.0){

             cartItem.total = 0.0;
      }
      //Check if the item should have a weight, if it should, and it doesn't, throw an error
      else if(cartItem.weight <= 0 && cartItem.product.byweight == '1'){

              throw "Item is quantified by weight, so it must have a weight"
      }
      //Just set the item weight to 1.0 if it is not measured by weight
      else if(cartItem.weight != 1 && cartItem.product.byweight == '0'){

              cartItem.weight = 1.0;
      }
      var item = this.items.find(o => o.product.barcode == cartItem.product.barcode);
      //If there is no item present in the cart
      if(!item)
        {
          //If the amount of items being added exceeds the product limit
          if(cartItem.product.limit < parseFloat(cartItem.quantity)*parseFloat(cartItem.weight))
            {
              console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
            }
          //else the amount of items being added does not exceed the product limit
          else{
              //The item has no specials, so just add the item to the cart
               if(cartItem.product.nITEMS == 0){
                 for(i = 0; i <  parseFloat(cartItem.quantity)*parseFloat(cartItem.weight); i+=parseFloat(cartItem.weight)){
                   cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                   //cartItem.total+=cartItem.product.price;
                   }
                 cartItem.quantity = parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                 this.items.push(cartItem);
               }
               //if the product has a buy N get M at X off special
               else if(cartItem.product.nITEMS > 1 && cartItem.product.mITEMS > 0 &&
                 cartItem.product.xPERC > 0 && cartItem.product.xPERC <= 1)
                 {
                   //Check if the quantity of the product being added is less than the qualifying
                   //N for the special to take affect
                   if(cartItem.product.nITEMS > parseFloat(cartItem.quantity)*parseFloat(cartItem.weight))
                     {
                       for(i = 0; i <  parseFloat(cartItem.quantity)*parseFloat(cartItem.weight); i+=parseFloat(cartItem.weight)){
                         cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                         }
                       cartItem.quantity = parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                       this.items.push(cartItem);
                      }
                      //the quantity of the product being added is greater than the qualifying
                      //N for the special to take affect
                    else{
                         //special variable that signfies the discount condition has been met
                         var discount = 0;
                         //A loop constrained by the quantity of the item being added
                         var i = parseFloat(cartItem.weight);
                         while(i <= parseFloat(cartItem.quantity)*parseFloat(cartItem.weight)){
                             //If the required amount of items have been added that meets the N in "buy N get M at X off"
                            if(discount == cartItem.product.nITEMS)
                              {
                                //Loop through the remaining items to be added, dicounting them by X, break the loop if i + j exceeds the amount of items being added
                                //where i is number of items added so far and j the amount of discounted items to be added.
                                loop:
                                for(j=0; j < cartItem.product.mITEMS; j++){
                                   if(i + j > parseFloat(cartItem.quantity))
                                     {
                                       break loop;
                                     }
                                   cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                   i+=cartItem.weight;
                                  }
                                 //Discounted items have been given, reset the discount
                                 discount = 0;
                               }
                             //Else discount condition has not yet been met
                             else{
                                  cartItem.total+=parseFloat(cartItem.product.price)*cartItem.weight*(1 - parseFloat(cartItem.product.markdown));
                                  //add to the discount condition
                                  discount+=parseFloat(cartItem.weight);
                                  i+=parseFloat(cartItem.weight);
                                 }
                             }
                          //update the item quantity
                          cartItem.quantity = parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                          this.items.push(cartItem)
                          }
                       }
                    //If the item has the buy N at X special
                    else if(cartItem.product.nITEMS > 1
                           && cartItem.product.xPERC > 0 && cartItem.product.xPERC <= 1)
                       {
                         //If the item does not have the qualifying N, add the items as normal
                         if(parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) < cartItem.product.nITEMS)
                           {
                             for(i = 0; i < parseFloat(cartItem.quantity)*parseFloat(cartItem.weight); i+=parseFloat(cartItem.weight)){
                                 cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                                }
                             cartItem.quantity = parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                             this.items.push(cartItem);
                           }
                         else{
                              //Check how many times the discount condition has been met by dividing the item quantity by needed quantity
                              var i = parseFloat(cartItem.weight);
                              var discount = Math.floor((parseFloat(cartItem.quantity)*parseFloat(cartItem.weight))/cartItem.product.nITEMS);
                              while(i <= parseFloat(cartItem.quantity)*parseFloat(cartItem.weight)){
                                   //If no discount condition is set, add the items as normal
                                   if(discount == 0)
                                     {
                                       cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                                       i+=parseFloat(cartItem.weight);
                                     }
                                   else{
                                        //Else discount items as needed before adding them
                                        if(i%cartItem.product.nITEMS != 0)
                                          {
                                            cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                            i+=parseFloat(cartItem.weight);
                                          }
                                        //ELse if the required amount of items has been ediscounted, reduce the discount condition by 1
                                        else if(i%cartItem.product.nITEMS == 0){
                                                cartItem.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                                i+=cartItem.weight;
                                                discount--;
                                           }
                                        }
                                    }
                              cartItem.quantity = parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                              this.items.push(cartItem);
                             }
                       }
                    }

      }
      else{
           //If the amount of items being added exceeds the product limit
           if(item.quantity + parseFloat(cartItem.weight)*parseFloat(cartItem.quantity) > item.product.limit)
             {
               console.log('This product is limited to ' + cartItem.product.limit + ' per customer.');
             }
           else{
                item.total = 0.0;
                if(item.product.nITEMS == 0){
                  for(i = 0; i < parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity; i+=parseFloat(cartItem.weight)){
                      item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                    }
                  item.quantity+=parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                }

                //if the product has a buy N get M at X off special
                else if(item.product.nITEMS > 1 && item.product.mITEMS > 0 &&
                 item.product.xPERC > 0 && item.product.xPERC <= 1)
                 {
                  //Check if the quantity of the product being added is less than the qualifying
                  //N for the special to take affect
                  if(item.product.nITEMS >= parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity)
                    {
                      for(i = 0; i < parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity; i+=parseFloat(cartItem.weight)){
                          item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                        }
                      item.quantity+=parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                    }
                    //the quantity of the product being added is greater than the qualifying
                    //N for the special to take affect
                   else{
                        //special variable that signfies the discount condition has been met
                        var discount = 0;
                        //A loop constrained by the quantity of the item being added
                        var i = parseFloat(cartItem.weight);
                        while(i <= parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity){
                             //If the required amount of items have been added that meets the N in "buy N get M at X off"
                             if(discount <= item.product.nITEMS)
                               {
                                 //Loop through the remaining items to be added, dicounting them by X, break the loop if i + j exceeds the amount of items being added
                                 //where i is number of items added so far and j the amount of discounted items to be added.
                                loop:
                                for(j = 0; j < item.product.mITEMS; j+=parseFloat(cartItem.weight)){
                                   if(i + j > parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity)
                                     {
                                       break loop;
                                     }
                                   item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                   i+=parseFloat(cartItem.weight);
                                   }
                                 //Discounted items have been given, reset the discount
                                 discount = 0;
                                }
                              //Else discount condition has not yet been met
                              else{
                                   item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                                   //add to the discount condition
                                   discount+=parseFloat(cartItem.weight);
                                   i+=parseFloat(cartItem.weight);
                                  }
                              }
                        }
                        //update the item quantity
                        item.quantity+=parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);

                  }
                 //If the item has the buy N at X special
                 else if(item.product.nITEMS > 1
                        && item.product.xPERC > 0 && item.product.xPERC <= 1)
                        {
                         //If the item does not have the qualifying N, add the items as normal
                         if(parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity < cartItem.product.nITEMS)
                          {
                            for(i = 0; i <  parseFloat(cartItem.quantity)*parseFloat(cartItem.weight) + item.quantity; i+=parseFloat(cartItem.weight)){
                                item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                               }
                            item.quantity += parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                           }
                         else{
                              //Check how many times the discount condition has been met by dividing the item quantity by needed quantity
                              var i = parseFloat(cartItem.weight);
                              var discount = Math.floor(((parseFloat(cartItem.quantity)*parseFloat(cartItem.weight))+item.quantity)/item.product.nITEMS);
                              while(i <= parseFloat(cartItem.quantity)*parseFloat(cartItem.weight)+item.quantity){
                                   //If no discount condition is set, add the items as normal
                                   if(discount == 0)
                                     {
                                       item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown));
                                       i+=parseFloat(cartItem.weight);
                                     }
                                   else{
                                        //Else discount items as needed before adding them
                                        if(i%item.product.nITEMS != 0)
                                          {
                                           item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                           i+=parseFloat(cartItem.weight);
                                          }
                                       //ELse if the required amount of items has been ediscounted, reduce the discount condition by 1
                                       else if(i%item.product.nITEMS == 0)
                                             {
                                              item.total+=parseFloat(cartItem.product.price)*parseFloat(cartItem.weight)*(1 - parseFloat(cartItem.product.markdown))*(1 - parseFloat(cartItem.product.xPERC));
                                              i+=parseFloat(cartItem.weight);
                                              discount--;
                                             }
                                        }
                                   }
                              item.quantity+=parseFloat(cartItem.quantity)*parseFloat(cartItem.weight);
                            }

                        }
                }
          }

    };
    /*Removes items from the cart, if the amount given is greater than the qauntity of the item in question
       remove the item from the cart entirely*/
    this.removefromCart = function(barcode, numtoRemove, weight) {
      if(numtoRemove == 0){
        console.log('Specify the amount you want to remove')
      }
      else{
        var item = this.items.find(o => o.product.barcode == barcode);
        if(!item){
          console.log('Item no longer present');
          return;
        }
        if(item.quantity <= numtoRemove*weight)
          {

            this.items = this.items.filter(function(o) { return o.product.barcode != barcode; });
            return;
          }
        this.addtoCart({product : item.product, quantity : Math.abs(numtoRemove) * -1, weight : weight, total: 0.0});

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
         this.itemCount = 0
        for(i = 0; i < this.items.length; i++){
          if(this.items[i].product.byweight == '0')
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
           this.itemPoundsCount = 0.0;
           for(i = 0; i < this.items.length; i++){
              if(this.items[i].product.byweight == '1')
                 this.itemPoundsCount+=this.items[i].quantity;
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
      if(this.updatePoundAmount() == false){
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
      if(this.updateItemAmount() == false){
        return 0;
      }
      else{
        return this.itemCount;
      }
    };
    /*Returns an array of length 2 with the amount of items not measured in pounds
      in the first index and the amount of items measured in pounds in the second index*/
    this.getItemAmountBOTH = function(){

      return [this.getItemAmountsPOUND(), this.getItemAmountsNonPOUND()];
    };
};
