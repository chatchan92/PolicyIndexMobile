'use strict';

describe('Controller: UnreleasedCtrl', function () {

  // load the controller's module
  beforeEach(module('policyindexMApp'));

  var UnreleasedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnreleasedCtrl = $controller('UnreleasedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UnreleasedCtrl.awesomeThings.length).toBe(3);
  });
});
