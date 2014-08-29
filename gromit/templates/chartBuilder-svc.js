'use strict';

canvas.factory('chartBuilder', [function(){
  return function build(records, opts, selector, legendBtn){
    var chartType = opts.chartType != undefined ? opts.chartType : 'column';
    var title = opts.title != undefined ? opts.title : null;
    var subtitle = opts.subtitle != undefined ? opts.subtitle : null;
    var colors = opts.colors != undefined ? opts.colors : ['red','#666666','#333333','green','#0064bb'];
    var yAxis = opts.yAxis != undefined ? opts.yAxis : {title:null};
    var tooltip = opts.tooltip != undefined ? opts.tooltip : null;
    var legendEnabled = opts.legendEnabled;
    var plotOptions = opts.plotOptions != undefined ? opts.plotOptions :
    {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels:{
          enabled:true
        }
      }
    };

    var chart = new Highcharts.Chart({
      chart: {
        type: chartType,
        renderTo: selector
      },
      title: {
        text: title,
        align:'left'
      },
      colors:colors,
      subtitle: {
        text: subtitle,
        align:'left'
      },
      xAxis: {
        categories: records.categories
      },
      yAxis: yAxis,
      credits:{enabled:false},
      tooltip: {
        formatter: tooltip
      },
      legend:{enabled:legendEnabled},
      plotOptions:plotOptions,
      series: records.data

    });

    if(legendBtn != undefined){
      $("#"+legendBtn).click(function() {
        if(chart.legend.isShowing == undefined){chart.legend.isShowing = true;}
        if (!chart.legend.isShowing) {
          chart.legend.group.show();
          chart.legend.isShowing = true;
        } else {
          chart.legend.group.hide();
          chart.legend.isShowing = false;
        }

      });
    }

  }
}]);