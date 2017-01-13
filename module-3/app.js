(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {

  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowItDown',
    bindToController: true 
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;
  console.log(found.items);

  found.checkEmptiness = function() {

    if(found.items == undefined)
      return false;
    
    if(found.items.length == 0) {
      console.log('not found')
      return true;
    }
    else {
      return false;
    }
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;
  
  narrowItDown.searchTerm = '';
  narrowItDown.matchedItems = undefined;

  narrowItDown.search = function () {
    
    console.log(narrowItDown.searchTerm);
    narrowItDown.matchedItems = undefined;

    var matchedItemsPromise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

    matchedItemsPromise.then(function success(result) {
      narrowItDown.matchedItems = result;
    });
  };

  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.matchedItems.splice(itemIndex, 1);
  };
  
;}


MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    var response = $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    })

    return response.then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available

        var menu_items = response.data['menu_items'];

        var foundItems = [];
        var count = 0;

        for (var i = 0; i < menu_items.length; i++) {
          var description = menu_items[i]['description'];
          if(description.includes(searchTerm)) {
            foundItems[count] = menu_items[i];
            count++;
          }
        }

        return foundItems; 
    });

  };
}

})();
