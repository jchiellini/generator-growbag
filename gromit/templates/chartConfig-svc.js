"use strict";
canvas.factory('chartConfig', [function(){
    return function retrieve(chartType, title, subtitle, plotlines,overrides){
      var config = {};

      var basic_config = {
        title:title,
        subtitle:subtitle,
        legendEnabled:true,
        colors:['red','#666666','#D4D4D4','green','#0064bb'],
        yAxis: [
          {
            title: {
              text: null
            },
            opposite: true
          },{
            title: {
              text: null
            },
            stackLabels: {
              enabled: true
            },
            labels:{
              enabled: true
            }
          }],
        plotOptions: {
          column: {
            yAxis:1,
            pointPadding: 0.2,
            borderWidth: 1,
            dataLabels:{enabled:true}
          }
        },
        sortSeriesByName: false,
        tooltip:function(){return '<b>'+ this.x +'</b><br/>'+this.series.name +': '+ this.y }
      };

      var line = function(){
        return{
          chartType:'spline',
          title:title,
          subtitle:subtitle,
          legendEnabled:true,
          yAxis:{
            title:null,
            stackLabels: {
              enabled: true
            }
          }
        }};

      var stacked = function(){
        var s = _.clone(basic_config, true);
        s.plotOptions.column.stacking = 'normal';
        s.plotOptions.column.dataLabels.color = 'white';
        s.plotOptions.column.dataLabels.enabled = false;
        s.yAxis[1].labels.enabled = false;
        return s;
      };

      var column = function(){
        return basic_config;
      };

      switch(chartType){
        case 'line':
          config = line;
          break;
        case 'stacked':
          config = stacked();
          break;
        case 'column':
          config = column();
          break;
        default:
          break;
      }

      if(plotlines != undefined || plotlines != null){
        var lines = [];
        lines = _.each(plotlines,function(target){
          plotlines.push({
              label:{text:target},
              color: 'black',
              width: 2,
              value: target,
              dashStyle: 'dash',
              zIndex:4
            });
        });
        config.yAxis[1].plotLines = lines;
      }

      if(overrides != undefined){
        _.each(overrides,function(v){
          _.each(v,function(value, key){
              config[key] = value;
          });
        })
      }

      return config;
    }
  }]);