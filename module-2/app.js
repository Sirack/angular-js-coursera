(function () {
'use strict';

angular.module('ShoppingApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemAdder = this;

  itemAdder.itemsToBuy = ShoppingListCheckOffService.getItems();

  itemAdder.buy = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
    {
        quantity: 1,
        name: 'Cookie'
    },
    {
        quantity: 2,
        name: 'Chips'
    },
        {
        quantity: 3,
        name: 'Organges'
    },
    {
        quantity: 4,
        name: 'Bananas'
    },
    {
        quantity: 5,
        name: 'Candy'
    },
  ];

  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIdex) {
    boughtItems.push(items[itemIdex]); // add item to bought list
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
