(function() {
  var Bitly, btoa;

  btoa = require('btoa');

  Bitly = (function() {
    Bitly.prototype.request_config = {
      endpoint: "https://api-ssl.bitly.com"
    };

    function Bitly(config) {
      this.config = config;
      this.checkConfig();
    }

    Bitly.prototype.checkConfig = function() {
      if (!this.config.client_id || !this.config.client_secret) {
        throw "Bitly config error: missing client_id or client_secret";
      }
    };

    Bitly.prototype.setAccessToken = function(access_token) {
      this.access_token = access_token;
      return this;
    };

    Bitly.prototype.authenticate = function(username, password) {};

    return Bitly;

  })();

  module.exports = Bitly;

}).call(this);
