canvas.controller('<%= gromitName %>Ctrl',[
  '$scope', 'hqlx', 'chartBuilder','dataBuilder','chartConfig','$q',
  function($scope, hqlx, chartBuilder, dataBuilder, chartConfig, $q){
    var <%= gromitName %>Query = {
      dataset: "<%= dataset %>"
    };


    $scope.getData = function(){
      var deferred = $q.defer();

      hqlx.get(
          '{gr.path.data.<%= gromitName %>}',
        <%= gromitName %>Query
        ).success(function(records){
          deferred.resolve(dataBuilder.sortedStandardModel(records, true));
          console.log("<%= gromitName %> Raw Data",records);
        });

      return deferred.promise;
    };

    $scope.<%= gromitName %>_data = $scope.getData();

    $scope.<%= gromitName %>_options = chartConfig('column','Title', 'Subtitle');

  }]);
