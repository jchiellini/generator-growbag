'use strict';

canvas.factory('dataBuilder', [function(){

  function sortedStandardModel(records, hasGroupedCategories){
    records = this.standardModel(records, hasGroupedCategories)
    return {data:_.sortBy(records.data,'name'),categories:records.categories};
  }

  function standardModel(records, hasGroupedCategories){
    var categories = hasGroupedCategories ? groupedCategories(records) : standardCategories(records);
    var data = _.groupBy(_.sortBy(records,'_insert_order'),'category');
    data = _.map(data,function(dp, key){
      return {name:key, type: dp[0].type, data:
        _.pluck(dp,function(d){return { name: d.yAxis, y:d.value}})}
    });
    return {data:data,categories:categories}
  }

  function standardCategories(records){
     return _.uniq(_.pluck(_.sortBy(records,'_insert_order'), 'yAxis'));
  }

  function groupedCategories(records){
     return  _.map(_.groupBy(_.sortBy(records,'_insert_order'),'group'),function(d, key){
       return {"name": key, "categories":standardCategories(d)}
     });
  }

  function table(records){
    return _.map(records,function(dp){
      return [dp['date'],dp['ncr_open'],dp['ncr_open_cum'],dp['ncr_close'],dp['ncr_close_cum']]
    })
  }

  return {
    sortedStandardModel:sortedStandardModel,
    standardModel:standardModel,
    table:table
  }

}]);