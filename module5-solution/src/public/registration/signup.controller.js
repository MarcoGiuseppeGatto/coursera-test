(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);
    
SignupController.$inject = ['SignupService', 'MenuService']
function SignupController(SignupService, MenuService) {
    var signupCtrl = this;

    signupCtrl.MessageForUser = "";
    signupCtrl.preferredMenuName = "";
 

    signupCtrl.user = SignupService.getUser();

    //We make use of a service to store user's data
    signupCtrl.submit = function () {
        //Save user's data into SignupService 
        SignupService.saveUserInfo(signupCtrl.user.first_name, signupCtrl.user.last_name, signupCtrl.user.email, signupCtrl.user.phone, signupCtrl.user.menu_number);
        signupCtrl.completed = true;
    };


    signupCtrl.searchMenuItem = function () {

        signupCtrl.MessageForUser = "";

        if (!signupCtrl.user.menu_number) {
            signupCtrl.preferredMenuName = "";
        }
        else {
                var promise = MenuService.getMatchedMenuItem(signupCtrl.user.menu_number);

                promise.then(function (foundItems) {

                    if (foundItems.length == 0) {
                        signupCtrl.preferredMenuName = "";
                        signupCtrl.MessageForUser = "No such menu number exists";
                    }
                    else {
                        //copy the unique item.name on foundItems preferredMenuName;
                        //it should be an array with just one item
                        signupCtrl.preferredMenuName = foundItems[0].name;
                        signupCtrl.MessageForUser = "";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };



};

})();
