var paymob = require('../src/main.js');
var expect = require("chai").expect;
describe('Secure hash', function() {

    it('calculates proper hash', function(){
      var data = {
        'a': '1',
        'b': '2',
        'c': ''
      };
      var expected_hash = '487e6fa0c68a4218053a8105bbd2de41633285cbae8847976d51a09fce320cf2';
      expect(paymob.calc_secure_hash('test', data)).to.eql(expected_hash);
    });

});