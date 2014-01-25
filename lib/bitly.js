(function() {
  var Bitly, btoa;

  btoa = require('btoa');

  Bitly = (function() {
    function Bitly(config) {
      this.config = config;
      this.getToken();
    }

    Bitly.prototype.getToken = function() {};

    return Bitly;

  })();

  module.exports = Bitly;

}).call(this);
