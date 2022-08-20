(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);

// 'categoriesItems' is injected through state's resolve
CategoriesListController.$inject = ['categoriesItems'];
function CategoriesListController(categoriesItems) {
  var categoriesList = this;
  categoriesList.items = categoriesItems;
}

})();
