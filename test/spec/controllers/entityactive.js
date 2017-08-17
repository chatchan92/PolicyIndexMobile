'use strict';

describe('Controller: EntityactiveCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var EntityactiveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntityactiveCtrl = $controller('EntityactiveCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EntityactiveCtrl.awesomeThings.length).toBe(3);
  });
});
