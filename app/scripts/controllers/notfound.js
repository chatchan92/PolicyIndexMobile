'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:UnreleasedCtrl
 * @description
 * # UnreleasedCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('NotfoundCtrl', function ($rootScope, $scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.indexName = "notfound";  

  });
