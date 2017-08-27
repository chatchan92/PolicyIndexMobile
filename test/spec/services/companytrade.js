'use strict';

describe('Service: CompanyTrade', function () {

  // load the service's module
  beforeEach(module('policyindexMApp'));

  // instantiate service
  var CompanyTrade;
  beforeEach(inject(function (_CompanyTrade_) {
    CompanyTrade = _CompanyTrade_;
  }));

  it('should do something', function () {
    expect(!!CompanyTrade).toBe(true);
  });

});
