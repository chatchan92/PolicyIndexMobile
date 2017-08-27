'use strict';

/**
 * @ngdoc service
 * @name policyindexMApp.CompanyTrade
 * @description
 * # CompanyTrade
 * Factory in the policyindexMApp.
 */
angular.module('policyindexMApp')
  .factory('CompanyTrade', ['$resource', function ($resource, id) {
    return $resource('http://www.jiaonengwang.com/files/sdgspt/sdgsjy.php', {}, {
      query: {
        method: 'GET',
        params: { 'id': id },
        isArray: true
      }
		})
  }]);
