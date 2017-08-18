'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:ChgprovCtrl
 * @description
 * # ChgprovCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('ChgprovCtrl', function ($rootScope, $scope, DataShareService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.setProv = function (provSelect) {
      $rootScope.provName = provSelect;
      console.log($rootScope.provName);
    };
    $scope.setIndex = function (indexSelect) {
      $rootScope.indexName = indexSelect;
    };
    $scope.indexToName = function (indexStr) {
      switch (indexStr) {
        case 'EntityAct':
          return('主体活跃指数');
        case 'PolicyDev':
          return('政策发展指数');  
        case 'TradeDyn':
          return('交易动态指数');
        default:
          return('主体活跃指数');    
      }
        
    };
  });
