(function () {
'use strict';

angular.module('Spinner')
.controller('SpinnerController', SpinnerController);


SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
        $ctrl.showSpinner = true;
        console.log("Spinner show"); //to be removed before publishing
        
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
        $ctrl.showSpinner = false;
        console.log("Spinner hide"); //to be removed before publishing
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
        $ctrl.showSpinner = false;
        console.log("Spinner hide");
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };

};

})();
