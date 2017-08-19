'use strict';

/**
 * @ngdoc function
 * @name policyindexMApp.controller:TradedynCtrl
 * @description
 * # TradedynCtrl
 * Controller of the policyindexMApp
 */
angular.module('policyindexMApp')
  .controller('TradedynCtrl', function ($rootScope, $scope) {
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
      "IndexType2PHP": 'TransDyn'
    }, function (data) {
      console.log(data);
      var i;
      for (i = 0; i < data.length; i++) {
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
      for (i = 0; i < data.length; i++) {
        xData.push(data[i].date);
        yData.push(parseInt(data[i].value));
      }
      drawLine($scope, xData, yData);
    });

  });

function drawLine($scope, xData, yData) {
  var myChart = echarts.init(document.getElementById('index-chg-chart'));
  var yMax = 0;
  for (var i = 0; i < yData.length; i++) {
    if (yMax < yData[i]) {
      yMax = yData[i];
    }
  }
  var yMin = 100;
  for (var i = 0; i < yData.length; i++) {
    if (yMin > yData[i]) {
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