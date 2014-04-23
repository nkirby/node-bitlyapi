// ================================================
// mocha test, more info at http://visionmedia.github.io/mocha/
// run with command: BITLY_TOKEN=your_token mocha
// ================================================

var should = require("chai").should();
var BitlyAPI = require("../lib/bitly");

var BITLY_TOKEN = process.env.BITLY_TOKEN;
var bitly = null;

describe("Bitly API module", function () {
  it("should be able to be initialized", function () {
    bitly = new BitlyAPI();
    bitly.should.be.ok;
  });

  // makes sure that the test is run with the env variable for token defined
  // if it fails, run liek this BITLY_TOKEN=your_token mocha
  it("should have a token", function () {
    BITLY_TOKEN.should.be.ok;
  });

  it("should be able to shorten a url after adding the access token", function (done) {
    var _longUrl = "http://www.google.com";
    bitly.setAccessToken(BITLY_TOKEN);

    bitly.shorten({longUrl: _longUrl}, function (err, _results) {
      var results = JSON.parse(_results);
      results.status_code.should.equal(200);
      results.data.url.should.be.ok;
      done();
    });
  });
});
