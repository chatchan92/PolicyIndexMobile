'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:CompanyinfoCtrl
 * @description
 * # CompanyinfoCtrl
 * Controller of the policyindexMApp
 */


angular.module('policyindexMApp')
  .controller('CompanyinfoCtrl', function ($rootScope, $scope, $resource, $route, $routeParams, Company, CompanyTrade) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.indexName = "companyPlatform";
    $rootScope.provName = '售电公司';

    $scope.companyid = $routeParams.id;
    Company.query({ 'id': $scope.companyid, 'p': 'detail', 'sKkey': 'Null' }, function (res) {
      $scope.corpName = res[0];
      $scope.business_range = res[1];
      if (res[3] != '0000-00-00') {
        $scope.corp_creat_time = res[3];
      }
      if (res[2] != '0') {
        $scope.corp_fond = res[2] + '万元';
      }
      if (res.Email != '') {
        $scope.corp_email = res.Email;
      }
      if (res.Phone != '') {
        $scope.corp_phone = res.Phone;
      }
      if (res.Web != '') {
        $scope.corp_web = res.Web;
      }
      if (res.Tel != '') {
        $scope.corp_tel = res.Tel;
      }
    });
    CompanyTrade.query({ 'id': $scope.companyid }, function (data) {
      if (data) {
        $scope.trade = {
          show: true,
          preis_unit: (parseInt(data[0][2] >= 0)) ? '元/kWh' : '厘/kWh(价差)',
          preis: data[0][2],
          date: convert_timestamp_date(data[0][0]),
          last_date: (data[0][3].substr(0, 2) == '年度') ?
            convert_timestamp_date(parseInt(data[0][0]) - 365) : convert_timestamp_date(parseInt(data[0][0]) - 30),
          volume: data[0][1],
          type: data[0][3]
        }
      }
    })
  });
