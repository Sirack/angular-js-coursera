(function () {
'use strict';

angular.module('LunchApp', [])

.controller('LunchController', MyLunchController);

LunchController.$inject = ['$scope']; // we need to inject our property

function MyLunchController($scope) {

  $scope.message = ""; // default value
    $scope.full_lunch = "";

    $scope.process = function () {
      var lunchs = $scope.full_lunch.split(',');

      // preprocess values here
      var realLunchs = []
      var count = 0;
      for(var i=0; i<lunchs.length; i++) {
        if(lunchs[i].trim().length > 0) {
          realLunchs[count] = lunchs[i];
          count++;
          console.log(realLunchs[count])
        }
      }

      if(realLunchs.length == 0) {
          $scope.message = "Please enter data first"
      }
      else {
        if(realLunchs.length >= 3) {
          $scope.message = "Too much!";
        }
        else if(realLunchs.length < 3) {
          $scope.message = "Enjoy!";
        }
      }
    };
}

})();
