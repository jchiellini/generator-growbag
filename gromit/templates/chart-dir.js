'use strict';

canvas.directive('chart', function ($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=',
      options: '=',
      id: '@',
      legendBtn: '@'
    },
    template: "<div></div>",
    controller: function ($scope, dataBuilder, chartBuilder) {

      if($scope.legendBtn != undefined){
        var btn = '<button id="'+$scope.legendBtn+'" class="btn btn-default pull-right legend_btn">Toggle Legend</button>';
        $('#'+$scope.id).before(btn);
      }

      $scope.data = $scope.data.then(function(data){
        console.log($scope.id+" Chart Options", $scope.options);
        console.log($scope.id+" Data",data);
        chartBuilder(
          data,
          $scope.options,
          $scope.id,
          $scope.legendBtn
        )
      });
    }
  };
});
