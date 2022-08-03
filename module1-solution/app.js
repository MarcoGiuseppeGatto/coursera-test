(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope', '$filter'];
    
    function LunchCheckController($scope, $filter) {

      $scope.foodList = "";         //List of items entered by user
      $scope.MessageForUser = "";   //Message to be displayed for the user
      $scope.messageClass = "";     //additional class to manage the color of the Message
      $scope.inputClass = "";      //additional class to manage the color of the border of the Input box
    
      $scope.SetMessage = function () {

        //The textbox is empty and the user clicks the "Check If Too Much" button
        if ($scope.foodList == "")
        {
            $scope.MessageForUser = "Please enter data first";
            $scope.messageClass = "redText";
            $scope.inputClass = "redBorder";
        }
        else //The textbox is not empty 
        {
            var foodListArray = $scope.foodList.split(',');

            //The new array foodListArrayFiltered contains just not empty items of foodListArray
            var foodListArrayFiltered = foodListArray.filter((foodItem) => {
                return foodItem.trim() !== "";
              });
            
            if (foodListArrayFiltered.length <= 3)
            {
                $scope.MessageForUser = "Enjoy!";
            }
            else
            {
                $scope.MessageForUser = "Too much!";
            }

            $scope.messageClass = "greenText";
            $scope.inputClass = "greenBorder";
        }

      };
    }



    
    })();