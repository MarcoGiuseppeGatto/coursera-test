(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };


  service.getMatchedMenuItem = function (shortName) {
      return $http({
          method: "GET",
          url: (ApiPath + "/menu_items/" + shortName.toUpperCase() + ".json"),
      }).then(function (response) {
                                      var foundItems = [];
                                      if (shortName.trim() != "") {
                                              foundItems.push(response.data);
                                      };
                                      //If short_name is found, foundItems will contain just one item
                                      return foundItems;  
                                    }, 
              function (error) { //In case of error it returns an empty array
                                   var foundItems = [];
                                   return foundItems;  
                               }
             );
  };


}



})();
