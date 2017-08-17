'use strict';

describe('Controller: PolicydevCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var PolicydevCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolicydevCtrl = $controller('PolicydevCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PolicydevCtrl.awesomeThings.length).toBe(3);
  });
});
