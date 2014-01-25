####################################################
# node-bitlyapi
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitlyapi
####################################################

btoa = require 'btoa'
request = require 'request'
querystring = require 'querystring'

class Bitly
	request_config: 
		endpoint: "https://api-ssl.bitly.com"

	constructor: (@config) ->
		@checkConfig()

	checkConfig: () ->
		if not @config.client_id or not @config.client_secret 
			throw "Bitly config error: missing client_id or client_secret"

	setAccessToken: (@access_token) ->
		return this

####################################################

	get: (path, params = {}, callback) ->
		if not params.access_token and @access_token
			params.access_token = @access_token

		request(
			{
				uri:@request_config.endpoint+path+"?"+querystring.stringify(params),
				method: "GET"
			}
			(error, response, body) ->
				if callback
					callback error, body
		)


####################################################
# Authentication
####################################################
# POST: /oauth/access_token

	authenticate: (username, password, callback) ->
		auth = "Basic "+btoa(@config.client_id+":"+@config.client_secret)
		console.log auth
		request(
			{
				uri:@request_config.endpoint+"/oauth/access_token"
				headers:
					"Authorization": auth
				method: "POST"
				form:
					grant_type: "password"
					username: username
					password: password
			}
			(error, response, body) ->
				if error
					callback error, null
				else 
					responseObj = JSON.parse(body)
					callback null, responseObj.access_token
		)

####################################################
# Objects
####################################################

	user: (login) ->
		new BitlyUser login, this

####################################################
# API Calls
####################################################

####################################################
# -- User Info/History --
# GET: /v3/oauth/app

	getInfoAboutApp: (app_client_id = @config.client_id, callback) ->
		@get "/v3/oauth/app", {client_id:app_client_id}, callback

####################################################
# GET /v3/user/info

	getInfoForUser: (login, callback) ->
		if typeof login is "string"
			@get "/v3/user/info", {login:login}, callback
		else
			@get "/v3/user/info", login, callback

####################################################
# GET /v3/user/link_history

	getLinkHistoryForUser: (params, callback) ->
		@get "/v3/user/link_history", params, callback

####################################################
# GET /v3/user/network_history

	getNetworkHistoryForUser: (params, callback) ->
		@get "/v3/user/network_history", params, callback

####################################################
# GET /v3/user/tracking_domain_list

	getTrackingDomainsForUser: (params, callback) ->
		@get "/v3/user/tracking_domain_list", params, callback

####################################################
# -- User Metrics --
# GET /v3/user/clicks

	getClicksForUser: (params, callback) ->
		@get "/v3/user/clicks", params, callback

####################################################
# GET /v3/user/countries

	getCountriesForUser: (params, callback) ->
		@get "/v3/user/countries", params, callback

####################################################
# GET /v3/user/popular_earned_by_clicks

	getPopularEarnedByClicksForUser: (params, callback) ->
		@get "/v3/user/popular_earned_by_clicks", params, callback

####################################################
# GET /v3/user/popular_earned_by_shortens

	getPopularEarnedByShortensForUser: (params, callback) ->
		@get "/v3/user/popular_earned_by_shortens", params, callback

####################################################
# GET /v3/user/popular_links

	getPopularLinksForUser: (params, callback) ->
		@get "/v3/user/popular_links", params, callback

####################################################
# GET /v3/user/popular_owned_by_clicks

	getPopularOwnedByClicksForUser: (params, callback) ->
		@get "/v3/user/popular_owned_by_clicks", params, callback

####################################################
# GET /v3/user/popular_owned_by_shortens

	getPopularOwnedByShortensForUser: (params, callback) ->
		@get "/v3/user/popular_owned_by_shortens", params, callback

####################################################
# GET /v3/user/referrers

	getReferrersForUser: (params, callback) ->
		@get "/v3/user/referrers", params, callback

####################################################
# GET /v3/user/referring_domains

	getReferringDomainsForUser: (params, callback) ->
		@get "/v3/user/referring_domains", params, callback

####################################################
# GET /v3/user/share_counts

	getShareCountsForUser: (params, callback) ->
		@get "/v3/user/share_counts", params, callback

####################################################
# GET /v3/user/share_counts_by_share_type

	getShareCountsByShareTypeForUser: (params, callback) ->
		@get "/v3/user/share_counts_by_share_type", params, callback

####################################################
# GET /v3/user/shorten_counts

	getShortenCountsForUser: (params, callback) ->
		@get "/v3/user/shorten_counts", params, callback

module.exports = Bitly;