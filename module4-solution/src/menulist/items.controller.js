(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsDetailController', ItemsDetailController);

// 'itemsList' is injected through state's resolve
ItemsDetailController.$inject = ['itemsList']
function ItemsDetailController(itemsList) {
  var itemsDetail = this;
  itemsDetail.menuitems = itemsList;

}

})();
