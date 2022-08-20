(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menulist/templates/categories-component.template.html',
  bindings: {
    items: '<'
  }
});

})();
