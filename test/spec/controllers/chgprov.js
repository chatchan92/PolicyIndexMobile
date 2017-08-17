'use strict';

describe('Controller: ChgprovCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var ChgprovCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChgprovCtrl = $controller('ChgprovCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChgprovCtrl.awesomeThings.length).toBe(3);
  });
});
