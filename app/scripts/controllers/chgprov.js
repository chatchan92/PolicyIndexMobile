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
    $rootScope.provName = '省份';
    $rootScope.indexName = 'nothing'
    if($rootScope.indexName == 'nothing') {
      $rootScope.indexName = 'EntityAct';
    }
    if($rootScope.provName == '省份') {
      $rootScope.provName = '广东';
    }
    $scope.setProv = function (provSelect) {
      $rootScope.provName = provSelect;

    };
    
    
  });
