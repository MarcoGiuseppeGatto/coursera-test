(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            message: '@userMessage',
            remove: '&onRemove',
            app_status: '@appStatus'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };

    return ddo;
    }


    function FoundItemsDirectiveController() {
    var list = this;

    list.isFoodListEmpty = function () {
        if ((list.message == "Nothing found") && (list.app_status != "intial state")) return true;
        else return false;
    };

    list.showTable = function () {
        if ((list.message != "Nothing found") && (list.app_status != "intial state")) return true;
        else return false;
    };

    }
        
        
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        
        menu.searchTerm = "";
        menu.MessageForUser = "";
        menu.appStatus = "intial state";
        menu.found = [];

        menu.searchMenuItems = function () {

            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (foundItems) {

                if (foundItems.length == 0)
                {
                    menu.found = [];
                    menu.MessageForUser = "Nothing found";
                    menu.appStatus = "user interaction occurred";
                }
                else
                {
                    //copy the foundItems array into found array
                    menu.found = foundItems.slice();
                    menu.MessageForUser = "";
                    menu.appStatus = "user interaction occurred";
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
            if (menu.found.length == 0) { 
                menu.appStatus = "intial state";
            }
          };

    }

    //Service
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
            
        service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
        }).then(function (response) {
                var foodListArray = response.data.menu_items;

                var foundItems = [];

                if (searchTerm.trim() != "") 
                {
                    //The new array foodListArrayFiltered contains just items with searchTerm contained in name or description
                    foundItems = foodListArray.filter((foodItem) => {
                        return  (foodItem.description.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1);
                        });
                }
                //"then" always return a promise. We envelop the array
                //foundItems within the promise returned by "then"
                return foundItems;
            
            })
        };

    }

})();
    