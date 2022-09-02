(function () {
'use strict';

angular.module('public')
.controller('MyinfoController', MyinfoController);
    
MyinfoController.$inject = ['SignupService', 'MenuService', 'ApiPath']
function MyinfoController(SignupService, MenuService, ApiPath) {
    var myinfoCtrl = this;

    myinfoCtrl.basePath = ApiPath;

    myinfoCtrl.user = SignupService.getUser();

    if (!myinfoCtrl.user.menu_number) {
        myinfoCtrl.preferredMenuName = "";
    }
    else {
        var promise = MenuService.getMatchedMenuItem(myinfoCtrl.user.menu_number);

        promise.then(function (foundItems) {

            if (foundItems.length == 0) {
                myinfoCtrl.preferredMenuName = "";
                myinfoCtrl.menuItem = {
                    "id": 0,
                    "short_name": "",
                    "name": "",
                    "description": "",
                    "price_small": "", "": "", 
                    "small_portion_name": "",
                    "large_portion_name": "",
                    "created_at": "",
                    "updated_at": "",
                    "category_short_name": "",
                    "image_present": false
                }
            }
            else {
                //copy the unique item.name on foundItems preferredMenuName;
                //it should be an array with just one item
                myinfoCtrl.preferredMenuName = foundItems[0].name;
                myinfoCtrl.menuItem = foundItems[0];
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

};

})();
