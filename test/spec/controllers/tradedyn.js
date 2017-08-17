'use strict';

describe('Controller: TradedynCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var TradedynCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TradedynCtrl = $controller('TradedynCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TradedynCtrl.awesomeThings.length).toBe(3);
  });
});
