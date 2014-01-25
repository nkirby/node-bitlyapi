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

    Bitly.prototype.getHighvalueLinks = function(params, callback) {
      return this.get("/v3/highvalue", params, callback);
    };

    Bitly.prototype.search = function(params, callback) {
      return this.get("/v3/search", params, callback);
    };

    Bitly.prototype.getRealtimeBurstingPhrases = function(params, callback) {
      return this.get("/v3/realtime/bursting_phrases", params, callback);
    };

    Bitly.prototype.getRealtimeHotPhrases = function(params, callback) {
      return this.get("/v3/realtime/hot_phrases", params, callback);
    };

    Bitly.prototype.getRealtimeClickrate = function(params, callback) {
      return this.get("/v3/realtime/clickrate", params, callback);
    };

    Bitly.prototype.getLinkFullInfo = function(params, callback) {
      return this.get("/v3/link/info", params, callback);
    };

    Bitly.prototype.getLinkContent = function(params, callback) {
      return this.get("/v3/link/content", params, callback);
    };

    Bitly.prototype.getLinkCategory = function(params, callback) {
      return this.get("/v3/link/category", params, callback);
    };

    Bitly.prototype.getLinkSocial = function(params, callback) {
      return this.get("/v3/link/social", params, callback);
    };

    Bitly.prototype.getLinkLocation = function(params, callback) {
      return this.get("/v3/link/location", params, callback);
    };

    Bitly.prototype.getLinkLanguage = function(params, callback) {
      return this.get("/v3/link/language", params, callback);
    };

    Bitly.prototype.expand = function(params, callback) {
      return this.get("/v3/expand", params, callback);
    };

    Bitly.prototype.getLinkInfo = function(params, callback) {
      return this.get("/v3/info", params, callback);
    };

    Bitly.prototype.linkLookup = function(params, callback) {
      return this.get("/v3/link/lookup", params, callback);
    };

    Bitly.prototype.shorten = function(params, callback) {
      return this.get("/v3/shorten", params, callback);
    };

    Bitly.prototype.userEditLink = function(params, callback) {
      return this.get("/v3/user/link_edit", params, callback);
    };

    Bitly.prototype.userLookupLink = function(params, callback) {
      return this.get("/v3/user/link_lookup", params, callback);
    };

    Bitly.prototype.userSaveLink = function(params, callback) {
      return this.get("/v3/user/link_save", params, callback);
    };

    Bitly.prototype.userSaveCustomDomainKeyword = function(params, callback) {
      return this.get("/v3/user/save_custom_domain_keyword", params, callback);
    };

    Bitly.prototype.getAppInfo = function(app_client_id, callback) {
      if (app_client_id == null) {
        app_client_id = this.config.client_id;
      }
      return this.get("/v3/oauth/app", {
        client_id: app_client_id
      }, callback);
    };

    Bitly.prototype.getUserInfo = function(login, callback) {
      return this.get("/v3/user/info", login, callback);
    };

    Bitly.prototype.getUserLinkHistory = function(params, callback) {
      return this.get("/v3/user/link_history", params, callback);
    };

    Bitly.prototype.getUserNetworkHistory = function(params, callback) {
      return this.get("/v3/user/network_history", params, callback);
    };

    Bitly.prototype.getUserTrackingDomains = function(params, callback) {
      return this.get("/v3/user/tracking_domain_list", params, callback);
    };

    Bitly.prototype.getUserClicks = function(params, callback) {
      return this.get("/v3/user/clicks", params, callback);
    };

    Bitly.prototype.getUserCountries = function(params, callback) {
      return this.get("/v3/user/countries", params, callback);
    };

    Bitly.prototype.getUserPopularEarnedByClicks = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_clicks", params, callback);
    };

    Bitly.prototype.getUserPopularEarnedByShortens = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_shortens", params, callback);
    };

    Bitly.prototype.getUserPopularLinks = function(params, callback) {
      return this.get("/v3/user/popular_links", params, callback);
    };

    Bitly.prototype.getUserPopularOwnedByClicks = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_clicks", params, callback);
    };

    Bitly.prototype.getUserPopularOwnedByShortens = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_shortens", params, callback);
    };

    Bitly.prototype.getUserReferrers = function(params, callback) {
      return this.get("/v3/user/referrers", params, callback);
    };

    Bitly.prototype.getUserReferringDomains = function(params, callback) {
      return this.get("/v3/user/referring_domains", params, callback);
    };

    Bitly.prototype.getUserShareCounts = function(params, callback) {
      return this.get("/v3/user/share_counts", params, callback);
    };

    Bitly.prototype.getUserShareCountsByShareType = function(params, callback) {
      return this.get("/v3/user/share_counts_by_share_type", params, callback);
    };

    Bitly.prototype.getUserShortenCounts = function(params, callback) {
      return this.get("/v3/user/shorten_counts", params, callback);
    };

    Bitly.prototype.getOrganizationBrandMessages = function(params, callback) {
      return this.get("/v3/organization/brand_messages", params, callback);
    };

    Bitly.prototype.getOrganizationIntersectingLinks = function(params, callback) {
      return this.get("/v3/organization/intersecting_links", params, callback);
    };

    Bitly.prototype.getOrganizationLeaderboard = function(params, callback) {
      return this.get("/v3/organization/leaderboard", params, callback);
    };

    Bitly.prototype.getOrganizationMissedOpportunities = function(params, callback) {
      return this.get("/v3/organization/missed_opportunities", params, callback);
    };

    Bitly.prototype.archiveBundle = function(params, callback) {
      return this.get("/v3/bundle/archive", params, callback);
    };

    Bitly.prototype.bundlesByUser = function(params, callback) {
      return this.get("/v3/bundle/bundles_by_user", params, callback);
    };

    Bitly.prototype.cloneBundle = function(params, callback) {
      return this.get("/v3/bundle/clone", params, callback);
    };

    Bitly.prototype.addCollaboratorToBundle = function(params, callback) {
      return this.get("/v3/bundle/collaborator_add", params, callback);
    };

    Bitly.prototype.removeCollaboratorFromBundle = function(params, callback) {
      return this.get("/v3/bundle/collaborator_remove", params, callback);
    };

    Bitly.prototype.getBundleContents = function(params, callback) {
      return this.get("/v3/bundle/contents", params, callback);
    };

    Bitly.prototype.createBundle = function(params, callback) {
      return this.get("/v3/bundle/create", params, callback);
    };

    Bitly.prototype.editBundle = function(params, callback) {
      return this.get("/v3/bundle/edit", params, callback);
    };

    Bitly.prototype.addLinkToBundle = function(params, callback) {
      return this.get("/v3/bundle/link_add", params, callback);
    };

    Bitly.prototype.addCommentToBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_comment_add", params, callback);
    };

    Bitly.prototype.editBundleLinkComment = function(params, callback) {
      return this.get("/v3/bundle/link_comment_edit", params, callback);
    };

    Bitly.prototype.removeBundleLinkComment = function(params, callback) {
      return this.get("/v3/bundle/link_comment_remove", params, callback);
    };

    Bitly.prototype.editBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_edit", params, callback);
    };

    Bitly.prototype.removeBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_remove", params, callback);
    };

    Bitly.prototype.reorderBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_reorder", params, callback);
    };

    Bitly.prototype.removePendingCollaboratorFromBundle = function(params, callback) {
      return this.get("/v3/bundle/pending_collaborator_remove", params, callback);
    };

    Bitly.prototype.reorderBundle = function(params, callback) {
      return this.get("/v3/bundle/reorder", params, callback);
    };

    Bitly.prototype.getBundleViewCount = function(params, callback) {
      return this.get("/v3/bundle/view_count", params, callback);
    };

    Bitly.prototype.getUserBundleHistory = function(params, callback) {
      return this.get("/v3/user/bundle_history", params, callback);
    };

    Bitly.prototype.getBitlyProDomain = function(params, callback) {
      return this.get("/v3/bitly_pro_domain", params, callback);
    };

    Bitly.prototype.getTrackingDomainClicks = function(params, callback) {
      return this.get("/v3/user/tracking_domain_clicks", params, callback);
    };

    Bitly.prototype.getTrackingDomainShortens = function(params, callback) {
      return this.get("/v3/user/tracking_domain_shorten_counts", params, callback);
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
      return this.bitly.getUserLinkHistory(params, callback);
    };

    BitlyUser.prototype.getNetworkHistory = function(params, callback) {
      return this.bitly.getUserNetworkHistory(params, callback);
    };

    BitlyUser.prototype.getTrackingDomains = function(params, callback) {
      return this.bitly.getUserTrackingDomains(params, callback);
    };

    BitlyUser.prototype.getClicks = function(params, callback) {
      return this.bitly.getUserClicks(params, callback);
    };

    BitlyUser.prototype.getCountries = function(params, callback) {
      return this.bitly.getUserCountries(params, callback);
    };

    BitlyUser.prototype.getPopularEarnedByClicks = function(params, callback) {
      return this.bitly.getUserPopularEarnedByClicks(params, callback);
    };

    BitlyUser.prototype.getPopularEarnedByShortens = function(params, callback) {
      return this.bitly.getUserPopularEarnedByShortens(params, callback);
    };

    BitlyUser.prototype.getPopularLinks = function(params, callback) {
      return this.bitly.getUserPopularLinks(params, callback);
    };

    BitlyUser.prototype.getPopularOwnedByClicks = function(params, callback) {
      return this.bitly.getUserPopularOwnedByClicks(params, callback);
    };

    BitlyUser.prototype.getPopularOwnedByShortens = function(params, callback) {
      return this.bitly.getUserPopularOwnedByShortens(params, callback);
    };

    BitlyUser.prototype.getReferrers = function(params, callback) {
      return this.bitly.getUserReferrers(params, callback);
    };

    BitlyUser.prototype.getReferringDomains = function(params, callback) {
      return this.bitly.getUserReferringDomains(params, callback);
    };

    BitlyUser.prototype.getShareCounts = function(params, callback) {
      return this.bitly.getUserShareCounts(params, callback);
    };

    BitlyUser.prototype.getShareCountsByShareType = function(params, callback) {
      return this.bitly.getUserShareCountsByShareType(params, callback);
    };

    BitlyUser.prototype.getShortenCounts = function(params, callback) {
      return this.bitly.getUserShortenCounts(params, callback);
    };

    return BitlyUser;

  })();

}).call(this);
