'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('MainCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.provName = '交能网';
    $rootScope.indexName = 'nothing';
  });
