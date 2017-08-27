'use strict';

/**
 * @ngdoc service
 * @name policyindexMApp.Company
 * @description
 * # Company
 * Factory in the policyindexMApp.
 */
angular.module('policyindexMApp')
  .factory('Company', ['$resource',
    function ($resource, id) {
      return $resource('http://www.jiaonengwang.com/files/sdgspt/corpjsonp.php', {}, {
        query: {
          method: 'GET',
          params: { 'id': id, 'p': 'detail', 'sKkey': 'Null' }
        }
      })
    }
  ]);

function convert_timestamp_date(d) {
  // convert day to unix timestamps, 25567 days diff.
  var DateCache = new Date(parseInt(d) * 86400000);
  // one month gap added.
  return(DateCache.toISOString().slice(0,7)); 

}  