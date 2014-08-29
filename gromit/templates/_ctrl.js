canvas.controller('<%= gromitName %>Ctrl',[
  '$scope', 'hqlx',
  function($scope, hqlx){
    var <%= gromitName %>Query = {
      dataset: "<%= dataset %>"
    };

  hqlx.get(
      '{gr.path.data.<%= gromitName %>}',
    <%= gromitName %>Query
    ).success(function(records){

    })

  }]);
