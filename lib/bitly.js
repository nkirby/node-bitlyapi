// ================================================
// BitlyAPI - version 0.4.0 
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

    BitlyAPI.prototype.get = function(path, params, callback) {
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

    BitlyAPI.prototype.getHighvalueLinks = function(params, callback) {
      return this.get("/v3/highvalue", params, callback);
    };

    BitlyAPI.prototype.search = function(params, callback) {
      return this.get("/v3/search", params, callback);
    };

    BitlyAPI.prototype.getRealtimeBurstingPhrases = function(params, callback) {
      return this.get("/v3/realtime/bursting_phrases", params, callback);
    };

    BitlyAPI.prototype.getRealtimeHotPhrases = function(params, callback) {
      return this.get("/v3/realtime/hot_phrases", params, callback);
    };

    BitlyAPI.prototype.getRealtimeClickrate = function(params, callback) {
      return this.get("/v3/realtime/clickrate", params, callback);
    };

    BitlyAPI.prototype.getLinkFullInfo = function(params, callback) {
      return this.get("/v3/link/info", params, callback);
    };

    BitlyAPI.prototype.getLinkContent = function(params, callback) {
      return this.get("/v3/link/content", params, callback);
    };

    BitlyAPI.prototype.getLinkCategory = function(params, callback) {
      return this.get("/v3/link/category", params, callback);
    };

    BitlyAPI.prototype.getLinkSocial = function(params, callback) {
      return this.get("/v3/link/social", params, callback);
    };

    BitlyAPI.prototype.getLinkLocation = function(params, callback) {
      return this.get("/v3/link/location", params, callback);
    };

    BitlyAPI.prototype.getLinkLanguage = function(params, callback) {
      return this.get("/v3/link/language", params, callback);
    };

    BitlyAPI.prototype.expand = function(params, callback) {
      return this.get("/v3/expand", params, callback);
    };

    BitlyAPI.prototype.getLinkInfo = function(params, callback) {
      return this.get("/v3/info", params, callback);
    };

    BitlyAPI.prototype.linkLookup = function(params, callback) {
      return this.get("/v3/link/lookup", params, callback);
    };

    BitlyAPI.prototype.shorten = function(params, callback) {
      return this.get("/v3/shorten", params, callback);
    };

    BitlyAPI.prototype.userEditLink = function(params, callback) {
      return this.get("/v3/user/link_edit", params, callback);
    };

    BitlyAPI.prototype.userLookupLink = function(params, callback) {
      return this.get("/v3/user/link_lookup", params, callback);
    };

    BitlyAPI.prototype.userSaveLink = function(params, callback) {
      return this.get("/v3/user/link_save", params, callback);
    };

    BitlyAPI.prototype.userSaveCustomDomainKeyword = function(params, callback) {
      return this.get("/v3/user/save_custom_domain_keyword", params, callback);
    };

    BitlyAPI.prototype.getLinkClicks = function(params, callback) {
      return this.get("/v3/link/clicks", params, callback);
    };

    BitlyAPI.prototype.getLinkCountries = function(params, callback) {
      return this.get("/v3/link/countries", params, callback);
    };

    BitlyAPI.prototype.getLinkEncoders = function(params, callback) {
      return this.get("/v3/link/encoders", params, callback);
    };

    BitlyAPI.prototype.getLinkEncodersByCount = function(params, callback) {
      return this.get("/v3/link/encoders_by_count", params, callback);
    };

    BitlyAPI.prototype.getLinkEncodersCount = function(params, callback) {
      return this.get("/v3/link/encoders_count", params, callback);
    };

    BitlyAPI.prototype.getLinkReferrers = function(params, callback) {
      return this.get("/v3/link/referrers", params, callback);
    };

    BitlyAPI.prototype.getLinkReferrersByDomain = function(params, callback) {
      return this.get("/v3/link/referrers_by_domain", params, callback);
    };

    BitlyAPI.prototype.getLinkReferringDomains = function(params, callback) {
      return this.get("/v3/link/referring_domains", params, callback);
    };

    BitlyAPI.prototype.getLinkShares = function(params, callback) {
      return this.get("/v3/link/shares", params, callback);
    };

    BitlyAPI.prototype.getAppInfo = function(params, callback) {
      return this.get("/v3/oauth/app", params, callback);
    };

    BitlyAPI.prototype.getUserInfo = function(login, callback) {
      return this.get("/v3/user/info", login, callback);
    };

    BitlyAPI.prototype.getUserLinkHistory = function(params, callback) {
      return this.get("/v3/user/link_history", params, callback);
    };

    BitlyAPI.prototype.getUserNetworkHistory = function(params, callback) {
      return this.get("/v3/user/network_history", params, callback);
    };

    BitlyAPI.prototype.getUserTrackingDomains = function(params, callback) {
      return this.get("/v3/user/tracking_domain_list", params, callback);
    };

    BitlyAPI.prototype.getUserClicks = function(params, callback) {
      return this.get("/v3/user/clicks", params, callback);
    };

    BitlyAPI.prototype.getUserCountries = function(params, callback) {
      return this.get("/v3/user/countries", params, callback);
    };

    BitlyAPI.prototype.getUserPopularEarnedByClicks = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_clicks", params, callback);
    };

    BitlyAPI.prototype.getUserPopularEarnedByShortens = function(params, callback) {
      return this.get("/v3/user/popular_earned_by_shortens", params, callback);
    };

    BitlyAPI.prototype.getUserPopularLinks = function(params, callback) {
      return this.get("/v3/user/popular_links", params, callback);
    };

    BitlyAPI.prototype.getUserPopularOwnedByClicks = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_clicks", params, callback);
    };

    BitlyAPI.prototype.getUserPopularOwnedByShortens = function(params, callback) {
      return this.get("/v3/user/popular_owned_by_shortens", params, callback);
    };

    BitlyAPI.prototype.getUserReferrers = function(params, callback) {
      return this.get("/v3/user/referrers", params, callback);
    };

    BitlyAPI.prototype.getUserReferringDomains = function(params, callback) {
      return this.get("/v3/user/referring_domains", params, callback);
    };

    BitlyAPI.prototype.getUserShareCounts = function(params, callback) {
      return this.get("/v3/user/share_counts", params, callback);
    };

    BitlyAPI.prototype.getUserShareCountsByShareType = function(params, callback) {
      return this.get("/v3/user/share_counts_by_share_type", params, callback);
    };

    BitlyAPI.prototype.getUserShortenCounts = function(params, callback) {
      return this.get("/v3/user/shorten_counts", params, callback);
    };

    BitlyAPI.prototype.getOrganizationBrandMessages = function(params, callback) {
      return this.get("/v3/organization/brand_messages", params, callback);
    };

    BitlyAPI.prototype.getOrganizationIntersectingLinks = function(params, callback) {
      return this.get("/v3/organization/intersecting_links", params, callback);
    };

    BitlyAPI.prototype.getOrganizationLeaderboard = function(params, callback) {
      return this.get("/v3/organization/leaderboard", params, callback);
    };

    BitlyAPI.prototype.getOrganizationMissedOpportunities = function(params, callback) {
      return this.get("/v3/organization/missed_opportunities", params, callback);
    };

    BitlyAPI.prototype.archiveBundle = function(params, callback) {
      return this.get("/v3/bundle/archive", params, callback);
    };

    BitlyAPI.prototype.bundlesByUser = function(params, callback) {
      return this.get("/v3/bundle/bundles_by_user", params, callback);
    };

    BitlyAPI.prototype.cloneBundle = function(params, callback) {
      return this.get("/v3/bundle/clone", params, callback);
    };

    BitlyAPI.prototype.addCollaboratorToBundle = function(params, callback) {
      return this.get("/v3/bundle/collaborator_add", params, callback);
    };

    BitlyAPI.prototype.removeCollaboratorFromBundle = function(params, callback) {
      return this.get("/v3/bundle/collaborator_remove", params, callback);
    };

    BitlyAPI.prototype.getBundleContents = function(params, callback) {
      return this.get("/v3/bundle/contents", params, callback);
    };

    BitlyAPI.prototype.createBundle = function(params, callback) {
      return this.get("/v3/bundle/create", params, callback);
    };

    BitlyAPI.prototype.editBundle = function(params, callback) {
      return this.get("/v3/bundle/edit", params, callback);
    };

    BitlyAPI.prototype.addLinkToBundle = function(params, callback) {
      return this.get("/v3/bundle/link_add", params, callback);
    };

    BitlyAPI.prototype.addCommentToBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_comment_add", params, callback);
    };

    BitlyAPI.prototype.editBundleLinkComment = function(params, callback) {
      return this.get("/v3/bundle/link_comment_edit", params, callback);
    };

    BitlyAPI.prototype.removeBundleLinkComment = function(params, callback) {
      return this.get("/v3/bundle/link_comment_remove", params, callback);
    };

    BitlyAPI.prototype.editBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_edit", params, callback);
    };

    BitlyAPI.prototype.removeBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_remove", params, callback);
    };

    BitlyAPI.prototype.reorderBundleLink = function(params, callback) {
      return this.get("/v3/bundle/link_reorder", params, callback);
    };

    BitlyAPI.prototype.removePendingCollaboratorFromBundle = function(params, callback) {
      return this.get("/v3/bundle/pending_collaborator_remove", params, callback);
    };

    BitlyAPI.prototype.reorderBundle = function(params, callback) {
      return this.get("/v3/bundle/reorder", params, callback);
    };

    BitlyAPI.prototype.getBundleViewCount = function(params, callback) {
      return this.get("/v3/bundle/view_count", params, callback);
    };

    BitlyAPI.prototype.getUserBundleHistory = function(params, callback) {
      return this.get("/v3/user/bundle_history", params, callback);
    };

    BitlyAPI.prototype.getBitlyProDomain = function(params, callback) {
      return this.get("/v3/bitly_pro_domain", params, callback);
    };

    BitlyAPI.prototype.getTrackingDomainClicks = function(params, callback) {
      return this.get("/v3/user/tracking_domain_clicks", params, callback);
    };

    BitlyAPI.prototype.getTrackingDomainShortens = function(params, callback) {
      return this.get("/v3/user/tracking_domain_shorten_counts", params, callback);
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
