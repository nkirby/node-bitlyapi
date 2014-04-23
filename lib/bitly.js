// ================================================
// node-bitlyapi - version 0.4.0 
// An OAuth, endpoint-complete, NodeJS interface for the public Bitly API
// Nathaniel Kirby (nate@projectspong.com)
// https://github.com/nkirby/node-bitlyapi
// ================================================

(function() {
  var BitlyAPI, BitlyLink, BitlyUser, btoa, querystring, request;

  btoa = require('btoa');

  request = require('request');

  querystring = require('querystring');

  BitlyAPI = (function() {
    BitlyAPI.prototype.request_config = {
      endpoint: "https://api-ssl.bitly.com"
    };

    function BitlyAPI(config) {
      this.config = config;
    }

    BitlyAPI.prototype.setAccessToken = function(access_token) {
      this.access_token = access_token;
      return this;
    };

    BitlyAPI.prototype.get = function(path, params, callback, options) {
      if (params == null) {
        params = {};
      }
      if (!params.access_token && this.access_token) {
        params.access_token = this.access_token;
      }
      options = options != null ? options : {};
      options.uri = this.request_config.endpoint + path + "?" + querystring.stringify(params);
      options.method = "GET";
      return request(options, function(error, response, body) {
        if (callback) {
          return callback(error, body);
        }
      });
    };

    BitlyAPI.prototype.authenticate = function(username, password, callback) {
      var auth;
      if (!this.config || !this.config.client_id || !this.config.client_secret) {
        throw "Bitly config error: you must specify a client_id and client_secret before authenticating a user.";
      }
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

    BitlyAPI.prototype.user = function(login) {
      return new BitlyUser(login, this);
    };

    BitlyAPI.prototype.shortenLink = function(link, callback) {
      return this.shorten({
        longUrl: link
      }, callback);
    };

    BitlyAPI.prototype.getHighvalueLinks = function(params, callback, options) {
      return this.get("/v3/highvalue", params, callback, options);
    };

    BitlyAPI.prototype.search = function(params, callback, options) {
      return this.get("/v3/search", params, callback, options);
    };

    BitlyAPI.prototype.getRealtimeBurstingPhrases = function(params, callback, options) {
      return this.get("/v3/realtime/bursting_phrases", params, callback, options);
    };

    BitlyAPI.prototype.getRealtimeHotPhrases = function(params, callback, options) {
      return this.get("/v3/realtime/hot_phrases", params, callback, options);
    };

    BitlyAPI.prototype.getRealtimeClickrate = function(params, callback, options) {
      return this.get("/v3/realtime/clickrate", params, callback, options);
    };

    BitlyAPI.prototype.getLinkFullInfo = function(params, callback, options) {
      return this.get("/v3/link/info", params, callback, options);
    };

    BitlyAPI.prototype.getLinkContent = function(params, callback, options) {
      return this.get("/v3/link/content", params, callback, options);
    };

    BitlyAPI.prototype.getLinkCategory = function(params, callback, options) {
      return this.get("/v3/link/category", params, callback, options);
    };

    BitlyAPI.prototype.getLinkSocial = function(params, callback, options) {
      return this.get("/v3/link/social", params, callback, options);
    };

    BitlyAPI.prototype.getLinkLocation = function(params, callback, options) {
      return this.get("/v3/link/location", params, callback, options);
    };

    BitlyAPI.prototype.getLinkLanguage = function(params, callback, options) {
      return this.get("/v3/link/language", params, callback, options);
    };

    BitlyAPI.prototype.expand = function(params, callback, options) {
      return this.get("/v3/expand", params, callback, options);
    };

    BitlyAPI.prototype.getLinkInfo = function(params, callback, options) {
      return this.get("/v3/info", params, callback, options);
    };

    BitlyAPI.prototype.linkLookup = function(params, callback, options) {
      return this.get("/v3/link/lookup", params, callback, options);
    };

    BitlyAPI.prototype.shorten = function(params, callback, options) {
      return this.get("/v3/shorten", params, callback, options);
    };

    BitlyAPI.prototype.userEditLink = function(params, callback, options) {
      return this.get("/v3/user/link_edit", params, callback, options);
    };

    BitlyAPI.prototype.userLookupLink = function(params, callback, options) {
      return this.get("/v3/user/link_lookup", params, callback, options);
    };

    BitlyAPI.prototype.userSaveLink = function(params, callback, options) {
      return this.get("/v3/user/link_save", params, callback, options);
    };

    BitlyAPI.prototype.userSaveCustomDomainKeyword = function(params, callback, options) {
      return this.get("/v3/user/save_custom_domain_keyword", params, callback, options);
    };

    BitlyAPI.prototype.getLinkClicks = function(params, callback, options) {
      return this.get("/v3/link/clicks", params, callback, options);
    };

    BitlyAPI.prototype.getLinkCountries = function(params, callback, options) {
      return this.get("/v3/link/countries", params, callback, options);
    };

    BitlyAPI.prototype.getLinkEncoders = function(params, callback, options) {
      return this.get("/v3/link/encoders", params, callback, options);
    };

    BitlyAPI.prototype.getLinkEncodersByCount = function(params, callback, options) {
      return this.get("/v3/link/encoders_by_count", params, callback, options);
    };

    BitlyAPI.prototype.getLinkEncodersCount = function(params, callback, options) {
      return this.get("/v3/link/encoders_count", params, callback, options);
    };

    BitlyAPI.prototype.getLinkReferrers = function(params, callback, options) {
      return this.get("/v3/link/referrers", params, callback, options);
    };

    BitlyAPI.prototype.getLinkReferrersByDomain = function(params, callback, options) {
      return this.get("/v3/link/referrers_by_domain", params, callback, options);
    };

    BitlyAPI.prototype.getLinkReferringDomains = function(params, callback, options) {
      return this.get("/v3/link/referring_domains", params, callback, options);
    };

    BitlyAPI.prototype.getLinkShares = function(params, callback, options) {
      return this.get("/v3/link/shares", params, callback, options);
    };

    BitlyAPI.prototype.getAppInfo = function(params, callback, options) {
      return this.get("/v3/oauth/app", params, callback, options);
    };

    BitlyAPI.prototype.getUserInfo = function(login, callback, options) {
      return this.get("/v3/user/info", login, callback, options);
    };

    BitlyAPI.prototype.getUserLinkHistory = function(params, callback, options) {
      return this.get("/v3/user/link_history", params, callback, options);
    };

    BitlyAPI.prototype.getUserNetworkHistory = function(params, callback, options) {
      return this.get("/v3/user/network_history", params, callback, options);
    };

    BitlyAPI.prototype.getUserTrackingDomains = function(params, callback, options) {
      return this.get("/v3/user/tracking_domain_list", params, callback, options);
    };

    BitlyAPI.prototype.getUserClicks = function(params, callback, options) {
      return this.get("/v3/user/clicks", params, callback, options);
    };

    BitlyAPI.prototype.getUserCountries = function(params, callback, options) {
      return this.get("/v3/user/countries", params, callback, options);
    };

    BitlyAPI.prototype.getUserPopularEarnedByClicks = function(params, callback, options) {
      return this.get("/v3/user/popular_earned_by_clicks", params, callback, options);
    };

    BitlyAPI.prototype.getUserPopularEarnedByShortens = function(params, callback, options) {
      return this.get("/v3/user/popular_earned_by_shortens", params, callback, options);
    };

    BitlyAPI.prototype.getUserPopularLinks = function(params, callback, options) {
      return this.get("/v3/user/popular_links", params, callback, options);
    };

    BitlyAPI.prototype.getUserPopularOwnedByClicks = function(params, callback, options) {
      return this.get("/v3/user/popular_owned_by_clicks", params, callback, options);
    };

    BitlyAPI.prototype.getUserPopularOwnedByShortens = function(params, callback, options) {
      return this.get("/v3/user/popular_owned_by_shortens", params, callback, options);
    };

    BitlyAPI.prototype.getUserReferrers = function(params, callback, options) {
      return this.get("/v3/user/referrers", params, callback, options);
    };

    BitlyAPI.prototype.getUserReferringDomains = function(params, callback, options) {
      return this.get("/v3/user/referring_domains", params, callback, options);
    };

    BitlyAPI.prototype.getUserShareCounts = function(params, callback, options) {
      return this.get("/v3/user/share_counts", params, callback, options);
    };

    BitlyAPI.prototype.getUserShareCountsByShareType = function(params, callback, options) {
      return this.get("/v3/user/share_counts_by_share_type", params, callback, options);
    };

    BitlyAPI.prototype.getUserShortenCounts = function(params, callback, options) {
      return this.get("/v3/user/shorten_counts", params, callback, options);
    };

    BitlyAPI.prototype.getOrganizationBrandMessages = function(params, callback, options) {
      return this.get("/v3/organization/brand_messages", params, callback, options);
    };

    BitlyAPI.prototype.getOrganizationIntersectingLinks = function(params, callback, options) {
      return this.get("/v3/organization/intersecting_links", params, callback, options);
    };

    BitlyAPI.prototype.getOrganizationLeaderboard = function(params, callback, options) {
      return this.get("/v3/organization/leaderboard", params, callback, options);
    };

    BitlyAPI.prototype.getOrganizationMissedOpportunities = function(params, callback, options) {
      return this.get("/v3/organization/missed_opportunities", params, callback, options);
    };

    BitlyAPI.prototype.archiveBundle = function(params, callback, options) {
      return this.get("/v3/bundle/archive", params, callback, options);
    };

    BitlyAPI.prototype.bundlesByUser = function(params, callback, options) {
      return this.get("/v3/bundle/bundles_by_user", params, callback, options);
    };

    BitlyAPI.prototype.cloneBundle = function(params, callback, options) {
      return this.get("/v3/bundle/clone", params, callback, options);
    };

    BitlyAPI.prototype.addCollaboratorToBundle = function(params, callback, options) {
      return this.get("/v3/bundle/collaborator_add", params, callback, options);
    };

    BitlyAPI.prototype.removeCollaboratorFromBundle = function(params, callback, options) {
      return this.get("/v3/bundle/collaborator_remove", params, callback, options);
    };

    BitlyAPI.prototype.getBundleContents = function(params, callback, options) {
      return this.get("/v3/bundle/contents", params, callback, options);
    };

    BitlyAPI.prototype.createBundle = function(params, callback, options) {
      return this.get("/v3/bundle/create", params, callback, options);
    };

    BitlyAPI.prototype.editBundle = function(params, callback, options) {
      return this.get("/v3/bundle/edit", params, callback, options);
    };

    BitlyAPI.prototype.addLinkToBundle = function(params, callback, options) {
      return this.get("/v3/bundle/link_add", params, callback, options);
    };

    BitlyAPI.prototype.addCommentToBundleLink = function(params, callback, options) {
      return this.get("/v3/bundle/link_comment_add", params, callback, options);
    };

    BitlyAPI.prototype.editBundleLinkComment = function(params, callback, options) {
      return this.get("/v3/bundle/link_comment_edit", params, callback, options);
    };

    BitlyAPI.prototype.removeBundleLinkComment = function(params, callback, options) {
      return this.get("/v3/bundle/link_comment_remove", params, callback, options);
    };

    BitlyAPI.prototype.editBundleLink = function(params, callback, options) {
      return this.get("/v3/bundle/link_edit", params, callback, options);
    };

    BitlyAPI.prototype.removeBundleLink = function(params, callback, options) {
      return this.get("/v3/bundle/link_remove", params, callback, options);
    };

    BitlyAPI.prototype.reorderBundleLink = function(params, callback, options) {
      return this.get("/v3/bundle/link_reorder", params, callback, options);
    };

    BitlyAPI.prototype.removePendingCollaboratorFromBundle = function(params, callback, options) {
      return this.get("/v3/bundle/pending_collaborator_remove", params, callback, options);
    };

    BitlyAPI.prototype.reorderBundle = function(params, callback, options) {
      return this.get("/v3/bundle/reorder", params, callback, options);
    };

    BitlyAPI.prototype.getBundleViewCount = function(params, callback, options) {
      return this.get("/v3/bundle/view_count", params, callback, options);
    };

    BitlyAPI.prototype.getUserBundleHistory = function(params, callback, options) {
      return this.get("/v3/user/bundle_history", params, callback, options);
    };

    BitlyAPI.prototype.getBitlyProDomain = function(params, callback, options) {
      return this.get("/v3/bitly_pro_domain", params, callback, options);
    };

    BitlyAPI.prototype.getTrackingDomainClicks = function(params, callback, options) {
      return this.get("/v3/user/tracking_domain_clicks", params, callback, options);
    };

    BitlyAPI.prototype.getTrackingDomainShortens = function(params, callback, options) {
      return this.get("/v3/user/tracking_domain_shorten_counts", params, callback, options);
    };

    return BitlyAPI;

  })();

  module.exports = BitlyAPI;

  BitlyLink = (function() {
    function BitlyLink(link, bitly) {
      this.link = link;
      this.bitly = bitly;
    }

    BitlyLink.prototype.expand = function(callback) {
      return this.bitly.expand({
        shortUrl: this.link
      }, callback);
    };

    BitlyLink.prototype.getInfo = function(params, callback) {
      params.shortUrl = this.link;
      return this.bitly.getLinkInfo(params, callback);
    };

    BitlyLink.prototype.edit = function(newInfo, callback) {
      var key, newKeys, value;
      newKeys = [];
      for (key in newInfo) {
        value = newInfo[key];
        newKeys.push(key);
        params[key] = value;
      }
      params.edit = newKeys.join(',');
      return this.bitly.userEditLink(params, callback);
    };

    BitlyLink.prototype.getClicks = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkClicks(params, callback);
    };

    BitlyLink.prototype.getCountries = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkCountries(params, callback);
    };

    BitlyLink.prototype.getEncoders = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkEncoders(params, callback);
    };

    BitlyLink.prototype.getEncodersByCount = function(params, callback) {
      params.link = this.link;
      return this.bitly.getEncodersByCount(params, callback);
    };

    BitlyLink.prototype.getEncodersCount = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkEncodersCount(params, callback);
    };

    BitlyLink.prototype.getReferrers = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkReferrers(params, callback);
    };

    BitlyLink.prototype.getReferrersByDomain = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkReferrersByDomain(params, callback);
    };

    BitlyLink.prototype.getReferringDomains = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinkReferringDomains(params, callback);
    };

    BitlyLink.prototype.getShares = function(params, callback) {
      params.link = this.link;
      return this.bitly.getLinKShares(params, callback);
    };

    return BitlyLink;

  })();

  BitlyUser = (function() {
    function BitlyUser(login, bitly) {
      this.login = login;
      this.bitly = bitly;
    }

    BitlyUser.prototype.getInfo = function(callback) {
      if (this.login) {
        return this.bitly.getInfoForUser({
          login: this.login
        }, callback);
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

    BitlyUser.prototype.getBundles = function(params, callback) {
      if (this.login) {
        params.user = this.login;
        return this.bitly.bundlesByUser(params, callback);
      } else {
        return this.bitly.getUserBundleHistory(params, callback);
      }
    };

    return BitlyUser;

  })();

}).call(this);
