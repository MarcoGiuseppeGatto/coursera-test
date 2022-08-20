(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // Categories view
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menulist/templates/categories-list.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
        categoriesItems: ['MenuDataService', function (MenuDataService) {
                                return MenuDataService.getAllCategories();
                        }]
    }
  })

  //Details view (it's child of Categories View)
  .state('categories.items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menulist/templates/items-list.template.html',
    controller: 'ItemsDetailController as itemsDetail',
    resolve: {
        itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
    }
  });
}

})();
