'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:EntityactiveCtrl
 * @description
 * # EntityactiveCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('EntityactCtrl', function ($rootScope, $scope, $resource, $http, DataShareService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function findRanking(data) {
      return (data.Province).search($rootScope.provName) != -1;
    }
    //指数和排名部分
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/barquery.php?callback=?", {
      "IndexType2PHP": 'EntityAct'
    }, function(data) {
      var i;
      for(i = 0; i < data.length; i++) {
        if ((data[i].Province).search($rootScope.provName) != -1) {
          //console.log(data[i].Province);
          $scope.$apply(function () {
            $scope.indexValue = data[i].Index;
          });
          break;
        }
      }
      $scope.$apply(function () {
        $scope.indexRanking = data.findIndex(findRanking) + 1;
      });

    });

    // index developments
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/linequery.php?callback=?", {
      "ProvinceLine2PHP": $rootScope.provName,
      "IndexType2PHP": 'EntityAct'
    }, function (data) {
      var xData = [], yData = [];
      var i;
      for(i = 0; i < data.length; i++) {
        xData.push(data[i].date);
        yData.push(parseInt(data[i].value));
      }
      drawLine($scope, xData, yData);
    });

    //新闻部分
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/policyquery.php", {
      "ProvinceLine2PHP": $rootScope.provName,
      "IndexType2PHP": 'EntityAct'
    }, function (datas) {
      if (datas == null) {
        return;
      } else {
        //$scope.news = datas.news.length > 2 ? datas.news : null;
        $scope.$apply(function () {
          $scope.news = datas.news.length > 2 ? datas.news.slice(0, 3) : null;
        });
      }
    });
    //活跃主体部分
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/tradequery.php", {
      "ProvinceLine2PHP": $rootScope.provName,
      "IndexType2PHP": 'EntityAct'
    }, function (data_original) {
      // 反解构JSON
      var name_company = [];
      var volume_company = [];
      var id_company = [];
      var total_volume = 0;
      // 反解构JSON
      var i;
      for (i = 0; i < data_original.data_present.length; i++) {
        total_volume += parseInt(data_original.data_present[i].value);
      }

      $scope.$apply(function () {
        $scope.entity = {};
        // 成交公司
        $scope.entity.company = data_original.data_present;
        // 活跃公司
        $scope.entity.company_e = data_original.data_company_e;
        $scope.entity.mainPercentage = parseInt(total_volume / parseInt(data_original.V_deal) * 100);
      });
    });
  });

function drawLine($scope, xData, yData) {
  var myChart = echarts.init(document.getElementById('index-chg-chart'));
  var yMax = 0;
  for (var i = 0; i < yData.length; i++) {
    if(yMax < yData[i]) {
      yMax = yData[i];
    }
  }
  var yMin = 100;
  for (var i = 0; i < yData.length; i++) {
    if(yMin > yData[i]) {
      yMin = yData[i];
    }
  }
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%'
    },
    xAxis: {
      show: false,
      data: xData
    },
    yAxis: {
      show: false
    },
    series: [{
      name: '分数',
      type: 'line',
      symbol: null,
      min: yMin - (yMax - yMin) * 0.25,
      max: yMax + (yMax - yMin) * 0.25,
      data: yData,
      lineStyle: {
        normal: {
          color: '#ff5c33'
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
