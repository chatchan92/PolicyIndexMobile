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
      "IndexType2PHP": 'TransDyn'
    }, function (data) {
      var xData = [], yData = [];
      var i;
      for (i = 0; i < data.length; i++) {
        xData.push(data[i].date);
        yData.push(parseInt(data[i].value));
      }
      
      drawLine($scope, xData, yData);
    });
    // historical trading datas
    $.getJSON("http://www.jiaonengwang.com/files/Policyindex/tradequery.php", {
      "ProvinceLine2PHP": $rootScope.provName,
      "IndexType2PHP": 'TransDyn'
    }, function (data_original) {
      var data = data_original.data_history.P_history;
      if (!data || data.length < 5) {
        return;
      }
      if(parseFloat(data[0][2]) == 0) {
        $scope.$apply(function () {
          $scope.showTradeRes = False;
        });
        return;
      }
      else {
        $scope.$apply(function () {
          $scope.showTradeRes = true;
        });
      }
      var xData = [], yData = [[], [], [], [], []], i, j, vData = [];
      for (i = data.length - 1; i >= 0; i--) {
        xData.push(strToMonth(data[i].date));
        vData.push(
          {
            value: parseInt(data_original.data_history.V_history[i].V_deal),
            itemStyle: {
              normal: {
                color: (i == data.length - 1 || parseInt(data[i].value[2]) < parseInt(data[i + 1].value[2])) ? "#001852": "#e01f54"
              }
            }
          }
        )
        for (j = 0; j < data[i].value.length; j++) {
          yData[j].push(parseInt(data[i].value[j]));
        }
        //yData.push(parseFloat(data[i].value[2]));
      }
      drawMutilLine($scope, xData, yData, vData);
      drawBar($scope, xData, vData);
      
    }); 
  });

function strToMonth(ns) {
  var data = new Date(parseInt(ns) * 1000);
  return((data.getMonth() + 1) + '月');
}

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
          color: '#ff5c33',
          width: 4
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

function drawMutilLine($scope, xData, yData, vData) {
  var myChart = echarts.init(document.getElementById('trade-res-price-chart'), '', {devicePixelRatio: 2});
  var yMax = -500;
  for (var i = 0; i < yData[2].length; i++) {
    if (yMax < yData[2][i]) {
      yMax = yData[2][i];
    }
  }
  var yMin = 100;
  for (var i = 0; i < yData[3].length; i++) {
    if (yMin > yData[3][i]) {
      yMin = yData[3][i];
    }
  }
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    grid: {
      left: '2%',
      right: '2%',
      top: '10%',
      bottom: '2%'
    },
    
    xAxis: {
      show: false,
      data: xData,
      axisLine: {
        show: false
      }
    },
    yAxis: [{
      show: false,
      axisLine: {onZero: false}
    }, {
      show: false,
      axisLine: {onZero: false}
    }],
    series: [{
    //   name: '分数',
    //   type: 'line',
    //   showSymbol: false,
    //   min: yMin - (yMax - yMin) * 0.25,
    //   max: yMax + (yMax - yMin) * 0.25,
    //   data: yData[0],
    //   lineStyle: {
    //     normal: {
    //       color: '#d48265',
    //       width: 4
    //     }
    //   }
    // }, {
      name: '分数',
      type: 'line',
      showSymbol: false,
      min: yMin - (yMax - yMin) * 0.25,
      max: yMax + (yMax - yMin) * 0.25,
      data: yData[1],
      lineStyle: {
        normal: {
          color: '#d48265',
          width: 4
        }
      }
    }, {
      name: '分数',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      min: yMin - (yMax - yMin) * 0.25,
      max: yMax + (yMax - yMin) * 0.25,
      data: yData[2],
      lineStyle: {
        normal: {
          color: '#757575',
          width: 4
        }
      }
    // }, {
    //   name: '分数',
    //   type: 'line',
    //   showSymbol: false,
    //   min: yMin - (yMax - yMin) * 0.25,
    //   max: yMax + (yMax - yMin) * 0.25,
    //   data: yData[3],
    //   lineStyle: {
    //     normal: {
    //       color: '#61a0a8',
    //       width: 4
    //     }
    //   }
    }, {
      name: '分数',
      type: 'line',
      showSymbol: false,
      min: yMin - (yMax - yMin) * 0.25,
      max: yMax + (yMax - yMin) * 0.25,
      data: yData[4],
      lineStyle: {
        normal: {
          color: '#61a0a8',
          width: 4
        }
      }
    // }, {
    //   name: '电量',
    //   type: 'bar',
    //   barWidth: 30,
    //   data: vData,
    //   yAxisIndex: 1
    }],
    textStyle: {
      fontSize: 36,
    },
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
}

function drawBar($scope, xData, yData) {
  var myChart = echarts.init(document.getElementById('trade-res-volume-chart'), '', {devicePixelRatio: 2});
  var option = {
    tooltip: {},
    grid: {
      left: '2%',
      right: '2%',
      top: '2%',
      bottom: '10%'
    },
    xAxis: {
      show: false,
      data: xData,
      axisLine: {
        show: false
      }
    },
    yAxis: {
      show: false,
      axisLine: {onZero: false}
    },
    series: [{
      name: '电量',
      type: 'bar',
      barWidth: 40,
      data: yData
    }]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
}