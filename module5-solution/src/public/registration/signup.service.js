(function () {
"use strict";

angular.module('public')
.service('SignupService', SignupService);

function SignupService() {
    var service = this;

    // User's data
    var user = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        menu_number: '',
        registration_completed: false
    };

    service.saveUserInfo = function (firstName, lastName, emailAddress, phoneNumber, menuNumber) {
       
        user.first_name = firstName;
        user.last_name = lastName;
        user.email = emailAddress;
        user.phone = phoneNumber;
        user.menu_number = menuNumber;
        user.registration_completed = true;
    };

    service.getUser = function () {
        if (!user.registration_completed) {  //Registration process has not been completed or has been partially completed!
            user.first_name = "";            //In those cases we empty all the user's fields
            user.last_name = "";
            user.email = "";
            user.phone = "";
            user.menu_number = "";
            user.registration_completed = false;
        }
        return user;
    };

}



})();
