(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var itemToBuy = this;
      
      itemToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

      itemToBuy.moveItemToBoughtList = function (idx, itemName, itemQuantity) {
        ShoppingListCheckOffService.removeItemToBuy(idx);
        ShoppingListCheckOffService.addItemToBought(itemName, itemQuantity);
      };

    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var itemBought = this;
    
      itemBought.items = ShoppingListCheckOffService.getItemsBought();

    }
    
    //Custom Service
    function ShoppingListCheckOffService() {
      var service = this;
    
      // List of items to Buy
      var itemsToBuy = [{ name: "cookies", 
                          quantity: 10 },
                        { name: "potato chips", 
                          quantity: 10 },
                        { name: "salted peanuts", 
                          quantity: 10 },
                        { name: "candied fruit", 
                          quantity: 10 },
                        { name: "candies", 
                          quantity: 10 }
                       ];
    
      // List of Bought items
      var itemsBought = [];

      service.addItemToBought = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        itemsBought.push(item);
      };
    
      service.getItemsToBuy = function () {
        return itemsToBuy;
      };

      service.getItemsBought = function () {
        return itemsBought;
      };
   
      service.removeItemToBuy = function (itemIndex) {
        itemsToBuy.splice(itemIndex, 1);
      };
    }
    
    })();
    