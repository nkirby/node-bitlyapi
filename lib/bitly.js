(function() {
  var Bitly, BitlyUser, btoa, querystring, request;

  btoa = require('btoa');

  request = require('request');

  querystring = require('querystring');

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

    Bitly.prototype.get = function(path, params, callback) {
      if (params == null) {
        params = {};
      }
      if (!params.access_token && this.access_token) {
        params.access_token = this.access_token;
      }
      return request({
        uri: this.request_config.endpoint + path + "?" + querystring.stringify(params),
        method: "GET"
      }, function(error, response, body) {
        if (callback) {
          return callback(error, body);
        }
      });
    };

    Bitly.prototype.authenticate = function(username, password, callback) {
      var auth;
      auth = "Basic " + btoa(this.config.client_id + ":" + this.config.client_secret);
      console.log(auth);
      return request({
        uri: this.request_config.endpoint + "/oauth/access_token",
        headers: {
          "Authorization": auth
        },
        method: "POST",
        form: {
          grant_type: "password",
          username: username,
          password: password
        }
      }, function(error, response, body) {
        var responseObj;
        if (error) {
          return callback(error, null);
        } else {
          responseObj = JSON.parse(body);
          return callback(null, responseObj.access_token);
        }
      });
    };

    Bitly.prototype.user = function(login) {
      return new BitlyUser(login, this);
    };

    Bitly.prototype.getInfoAboutApp = function(app_client_id, callback) {
      if (app_client_id == null) {
        app_client_id = this.config.client_id;
      }
      return this.get("/v3/oauth/app", {
        client_id: app_client_id
      }, callback);
    };

    Bitly.prototype.getInfoForUser = function(login, callback) {
      if (typeof login === "string") {
        return this.get("/v3/user/info", {
          login: login
        }, callback);
      } else {
        return this.get("/v3/user/info", login, callback);
      }
    };

    Bitly.prototype.getLinkHistoryForUser = function(params, callback) {
      return this.get("/v3/user/link_history", params, callback);
    };

    Bitly.prototype.getNetworkHistoryForUser = function(params, callback) {
      return this.get("/v3/user/network_history", params, callback);
    };

    Bitly.prototype.getTrackingDomainsForUser = function(params, callback) {
      return this.get("/v3/user/tracking_domain_list", params, callback);
    };

    Bitly.prototype.getClicksForUser = function(params, callback) {
      return this.get("/v3/user/clicks", params, callback);
    };

    Bitly.prototype.getCountriesForUser = function(params, callback) {
      return this.get("/v3/user/countries", params, callback);
    };

    Bitly.prototype.getPopularEarnedByClicksForUser = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_clicks", params, callback);
    };

    Bitly.prototype.getPopularEarnedByShortensForUser = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_shortens", params, callback);
    };

    Bitly.prototype.getPopularLinksForUser = function(params, callback) {
      return this.get("/v3/user/popular_links", params, callback);
    };

    Bitly.prototype.getPopularOwnedByClicksForUser = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_clicks", params, callback);
    };

    Bitly.prototype.getPopularOwnedByShortensForUser = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_shortens", params, callback);
    };

    Bitly.prototype.getReferrersForUser = function(params, callback) {
      return this.get("/v3/user/referrers", params, callback);
    };

    Bitly.prototype.getReferringDomainsForUser = function(params, callback) {
      return this.get("/v3/user/referring_domains", params, callback);
    };

    Bitly.prototype.getShareCountsForUser = function(params, callback) {
      return this.get("/v3/user/share_counts", params, callback);
    };

    Bitly.prototype.getShareCountsByShareTypeForUser = function(params, callback) {
      return this.get("/v3/user/share_counts_by_share_type", params, callback);
    };

    Bitly.prototype.getShortenCountsForUser = function(params, callback) {
      return this.get("/v3/user/shorten_counts", params, callback);
    };

    return Bitly;

  })();

  module.exports = Bitly;

  BitlyUser = (function() {
    function BitlyUser(login, bitly) {
      this.login = login;
      this.bitly = bitly;
    }

    BitlyUser.prototype.getInfo = function(callback) {
      if (this.login) {
        return this.bitly.getInfoForUser(this.login, callback);
      } else {
        return this.bitly.getInfoForUser(null, callback);
      }
    };

    BitlyUser.prototype.getLinkHistory = function(params, callback) {
      if (this.login) {
        params.user = this.login;
      }
      return this.bitly.getLinkHistoryForUser(params, callback);
    };

    BitlyUser.prototype.getNetworkHistory = function(params, callback) {
      return this.bitly.getNetworkHistoryForUser(params, callback);
    };

    BitlyUser.prototype.getTrackingDomains = function(params, callback) {
      return this.bitly.getTrackingDomainsForUser(params, callback);
    };

    BitlyUser.prototype.getClicks = function(params, callback) {
      return this.bitly.getClicksForUser(params, callback);
    };

    BitlyUser.prototype.getCountries = function(params, callback) {
      return this.bitly.getCountriesForUser(params, callback);
    };

    BitlyUser.prototype.getPopularEarnedByClicks = function(params, callback) {
      return this.bitly.getPopularEarnedByClicksForUser(params, callback);
    };

    BitlyUser.prototype.getPopularEarnedByShortens = function(params, callback) {
      return this.bitly.getPopularEarnedByShortensForUser(params, callback);
    };

    BitlyUser.prototype.getPopularLinks = function(params, callback) {
      return this.bitly.getPopularLinksForUser(params, callback);
    };

    BitlyUser.prototype.getPopularOwnedByClicks = function(params, callback) {
      return this.bitly.getPopularOwnedByClicksForUser(params, callback);
    };

    BitlyUser.prototype.getPopularOwnedByShortens = function(params, callback) {
      return this.bitly.getPopularOwnedByShortensForUser(params, callback);
    };

    BitlyUser.prototype.getReferrers = function(params, callback) {
      return this.bitly.getReferrersForUser(params, callback);
    };

    BitlyUser.prototype.getReferringDomains = function(params, callback) {
      return this.bitly.getReferringDomainsForUser(params, callback);
    };

    BitlyUser.prototype.getShareCountsForUser = function(params, callback) {
      return this.bitly.getShareCountsForUser(params, callback);
    };

    BitlyUser.prototype.getShareCountsByShareType = function(params, callback) {
      return this.bitly.getShareCountsByShareTypeForUser(params, callback);
    };

    BitlyUser.prototype.getShortenCounts = function(params, callback) {
      return this.bitly.getShortenCountsForUser(params, callback);
    };

    return BitlyUser;

  })();

}).call(this);
