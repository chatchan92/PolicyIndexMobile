'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:EntityactiveCtrl
 * @description
 * # EntityactiveCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('EntityactiveCtrl', function ($rootScope, $scope, $resource, $http, DataShareService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/policyquery.php", {
      "ProvinceLine2PHP": '广东省', //$rootScope.provName
      "IndexType2PHP": 'PolicyDev'
    }, function (datas) {
      if (datas == null) {
        return;
      } else {
        //$scope.news = datas.news.length > 2 ? datas.news : null;
        $scope.$apply(function() {
          $scope.news = datas.news.length > 2 ? datas.news : null;
        });
      }
    });
  });
