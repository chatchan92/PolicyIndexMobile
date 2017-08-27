'use strict';

describe('Controller: CompanyinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var CompanyinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanyinfoCtrl = $controller('CompanyinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CompanyinfoCtrl.awesomeThings.length).toBe(3);
  });
});
