(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
        return $http({
                       method: "GET",
                       url: (ApiBasePath + "/categories.json")
                     }).then(function (response) {
                        //"then" always return a promise. We envelop the array
                        //response.data within the promise returned by "then"
                        return response.data;
                     });
    };


    service.getItemsForCategory = function (categoryShortName) {
        return $http({
                        method: "GET",
                        url: (ApiBasePath + "/menu_items.json"),
                        params: {
                            category: categoryShortName
                        }
                    }).then(function (response) {
                        //"then" always return a promise. We envelop the array
                        //response.data within the promise returned by "then"
                        return response.data.menu_items;
                    });
    };

    
}

})();
