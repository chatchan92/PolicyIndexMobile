'use strict';

/**
 * @ngdoc overview
 * @name policyindexMApp
 * @description
 * # policyindexMApp
 *
 * Main module of the application.
 */

angular
  .module('policyindexMApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .service("DataShareService", function () {
    //无需定义其他变量，无需return，如果使用factory()则至少需要return一个空对象
  })
  .config(function ($routeProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/chgProv', {
        templateUrl: 'views/chgprov.html',
        controller: 'ChgprovCtrl',
        controllerAs: 'chgProv'
      })
      .when('/EntityAct', {
        templateUrl: 'views/entityact.html',
        controller: 'EntityactCtrl',
        controllerAs: 'entityAct'
      })
      .when('/EntityAct/:provName', {
        templateUrl: 'views/entityact.html',
        controller: 'EntityactCtrl',
        controllerAs: 'entityAct'
      })
      .when('/TradeDyn/:provName', {
        templateUrl: 'views/tradedyn.html',
        controller: 'TradedynCtrl',
        controllerAs: 'tradeDyn'
      })
      .when('/PolicyDev/:provName', {
        templateUrl: 'views/policydev.html',
        controller: 'PolicydevCtrl',
        controllerAs: 'policyDev'
      })
      .when('/unreleased', {
        templateUrl: 'views/unreleased.html',
        controller: 'UnreleasedCtrl',
        controllerAs: 'unreleased'
      })
      .otherwise({
        redirectTo: '/'
      });
    

  })
  .controller('IndexCtrl', function ($rootScope, $scope, DataShareService) {
    $scope.menuBtnCheck = true;
    $rootScope.provName = '省份';
    $rootScope.indexName = 'nothing';
    $scope.setNav = function (index) {
      $scope.menuBtnCheck = (index == 1 ? 1 - $scope.menuBtnCheck : 1);
    };
    $rootScope.indexToName = function (indexStr) {
      switch (indexStr) {
        case 'EntityAct':
          return('主体活跃');
        case 'PolicyDev':
          return('政策发展');  
        case 'TradeDyn':
          return('交易动态');
        case 'MarktDev':
          return('主体活跃');
        default:
          return('交能售电指数');     
      }
        
    };
    $rootScope.setIndex = function (indexSelect) {
      if($rootScope.provName == '省份') {
        $rootScope.provName = '广东';
      }
      console.log(indexSelect);
      $rootScope.indexName = indexSelect;
      
    };
    $rootScope.setProv = function (provSelect) {
      if($rootScope.indexName == 'nothing') {
        $rootScope.indexName = 'EntityAct';
      }
      $rootScope.provName = provSelect;
    };
  });

