####################################################
# node-bitlyapi
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitlyapi
####################################################

btoa = require 'btoa'
request = require 'request'
querystring = require 'querystring'

class BitlyAPI
	request_config: 
		endpoint: "https://api-ssl.bitly.com"

	constructor: (@config) ->

	setAccessToken: (@access_token) ->
		return this

####################################################

	get: (path, params = {}, callback, options) ->
		if not params.access_token and @access_token
			params.access_token = @access_token

		# Options can be any of the request options listed at https://github.com/mikeal/request#requestoptions-callback.
		# uri and method are overwritten
		options = options ? {}
		options.uri = @request_config.endpoint+path+"?"+querystring.stringify(params)
		options.method = "GET"

		request(options, (error, response, body) ->
			if callback
				callback error, body
		)


####################################################
# Authentication
####################################################
# POST: /oauth/access_token

	authenticate: (username, password, callback) ->
		if not @config or not @config.client_id or not @config.client_secret
			throw "Bitly config error: you must specify a client_id and client_secret before authenticating a user."
		
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
# Helpers
####################################################


	shortenLink: (link, callback) ->
		@shorten {longUrl:link}, callback

####################################################
# API Calls
####################################################

####################################################
# Data APIs
# GET /v3/highvalue

	getHighvalueLinks: (params, callback, options) ->
		@get "/v3/highvalue", params, callback, options

####################################################
# GET /v3/search

	search: (params, callback, options) ->
		@get "/v3/search", params, callback, options

####################################################
# GET /v3/realtime/bursting_phrases

	getRealtimeBurstingPhrases: (params, callback, options) ->
		@get "/v3/realtime/bursting_phrases", params, callback, options

####################################################
# GET /v3/realtime/hot_phrases

	getRealtimeHotPhrases: (params, callback, options) ->
		@get "/v3/realtime/hot_phrases", params, callback, options

####################################################
# GET /v3/realtime/clickrate

	getRealtimeClickrate: (params, callback, options) ->
		@get "/v3/realtime/clickrate", params, callback, options

####################################################
# GET /v3/link/info

	getLinkFullInfo: (params, callback, options) ->
		@get "/v3/link/info", params, callback, options

####################################################
# GET /v3/link/content
	
	getLinkContent: (params, callback, options) ->
		@get "/v3/link/content", params, callback, options

####################################################
# GET /v3/link/category

	getLinkCategory: (params, callback, options) ->
		@get "/v3/link/category", params, callback, options

####################################################
# GET /v3/link/social

	getLinkSocial: (params, callback, options) ->
		@get "/v3/link/social", params, callback, options

####################################################
# GET /v3/link/location

	getLinkLocation: (params, callback, options) ->
		@get "/v3/link/location", params, callback, options

####################################################
# GET /v3/link/language

	getLinkLanguage: (params, callback, options) ->
		@get "/v3/link/language", params, callback, options

####################################################
# Links
# GET /v3/expand

	expand: (params, callback, options) ->
		@get "/v3/expand", params, callback, options

####################################################
# GET /v3/info

	getLinkInfo: (params, callback, options) ->
		@get "/v3/info", params, callback, options

####################################################
# GET /v3/link/lookup

	linkLookup: (params, callback, options) ->
		@get "/v3/link/lookup", params, callback, options

####################################################
# GET /v3/shorten

	shorten: (params, callback, options) ->
		@get "/v3/shorten", params, callback, options

####################################################
# GET /v3/user/link_edit

	userEditLink: (params, callback, options) ->
		@get "/v3/user/link_edit", params, callback, options

####################################################
# GET /v3/user/link_lookup

	userLookupLink: (params, callback, options) ->
		@get "/v3/user/link_lookup", params, callback, options

####################################################
# GET /v3/user/link_save

	userSaveLink: (params, callback, options) ->
		@get "/v3/user/link_save", params, callback, options

####################################################
# GET /v3/user/save_custom_domain_keyword
	
	userSaveCustomDomainKeyword: (params, callback, options) ->
		@get "/v3/user/save_custom_domain_keyword", params, callback, options

####################################################
# Link Metrics
# GET /v3/link/clicks

	getLinkClicks: (params, callback, options) ->
		@get "/v3/link/clicks", params, callback, options

####################################################
# GET /v3/link/countries

	getLinkCountries: (params, callback, options) ->
		@get "/v3/link/countries", params, callback, options

####################################################
# GET /v3/link/encoders

	getLinkEncoders: (params, callback, options) ->
		@get "/v3/link/encoders", params, callback, options

####################################################
# GET /v3/link/encoders_by_count
	getLinkEncodersByCount: (params, callback, options) ->
		@get "/v3/link/encoders_by_count", params, callback, options

####################################################
# GET /v3/link/encoders_count

	getLinkEncodersCount: (params, callback, options) ->
		@get "/v3/link/encoders_count", params, callback, options

####################################################
# GET /v3/link/referrers

	getLinkReferrers: (params, callback, options) ->
		@get "/v3/link/referrers", params, callback, options

####################################################
# GET /v3/link/referrers_by_domain

	getLinkReferrersByDomain: (params, callback, options) ->
		@get "/v3/link/referrers_by_domain", params, callback, options

####################################################
# GET /v3/link/referring_domains

	getLinkReferringDomains: (params, callback, options) ->
		@get "/v3/link/referring_domains", params, callback, options

####################################################
# GET /v3/link/shares

	getLinkShares: (params, callback, options) ->
		@get "/v3/link/shares", params, callback, options

####################################################
# -- User Info/History --
# GET: /v3/oauth/app

	getAppInfo: (params, callback, options) ->
		@get "/v3/oauth/app", params, callback, options

####################################################
# GET /v3/user/info

	getUserInfo: (login, callback, options) ->
		@get "/v3/user/info", login, callback, options

####################################################
# GET /v3/user/link_history

	getUserLinkHistory: (params, callback, options) ->
		@get "/v3/user/link_history", params, callback, options

####################################################
# GET /v3/user/network_history

	getUserNetworkHistory: (params, callback, options) ->
		@get "/v3/user/network_history", params, callback, options

####################################################
# GET /v3/user/tracking_domain_list

	getUserTrackingDomains: (params, callback, options) ->
		@get "/v3/user/tracking_domain_list", params, callback, options

####################################################
# -- User Metrics --
# GET /v3/user/clicks

	getUserClicks: (params, callback, options) ->
		@get "/v3/user/clicks", params, callback, options

####################################################
# GET /v3/user/countries

	getUserCountries: (params, callback, options) ->
		@get "/v3/user/countries", params, callback, options

####################################################
# GET /v3/user/popular_earned_by_clicks

	getUserPopularEarnedByClicks: (params, callback, options) ->
		@get "/v3/user/popular_earned_by_clicks", params, callback, options

####################################################
# GET /v3/user/popular_earned_by_shortens

	getUserPopularEarnedByShortens: (params, callback, options) ->
		@get "/v3/user/popular_earned_by_shortens", params, callback, options

####################################################
# GET /v3/user/popular_links

	getUserPopularLinks: (params, callback, options) ->
		@get "/v3/user/popular_links", params, callback, options

####################################################
# GET /v3/user/popular_owned_by_clicks

	getUserPopularOwnedByClicks: (params, callback, options) ->
		@get "/v3/user/popular_owned_by_clicks", params, callback, options

####################################################
# GET /v3/user/popular_owned_by_shortens

	getUserPopularOwnedByShortens: (params, callback, options) ->
		@get "/v3/user/popular_owned_by_shortens", params, callback, options

####################################################
# GET /v3/user/referrers

	getUserReferrers: (params, callback, options) ->
		@get "/v3/user/referrers", params, callback, options

####################################################
# GET /v3/user/referring_domains

	getUserReferringDomains: (params, callback, options) ->
		@get "/v3/user/referring_domains", params, callback, options

####################################################
# GET /v3/user/share_counts

	getUserShareCounts: (params, callback, options) ->
		@get "/v3/user/share_counts", params, callback, options

####################################################
# GET /v3/user/share_counts_by_share_type

	getUserShareCountsByShareType: (params, callback, options) ->
		@get "/v3/user/share_counts_by_share_type", params, callback, options

####################################################
# GET /v3/user/shorten_counts

	getUserShortenCounts: (params, callback, options) ->
		@get "/v3/user/shorten_counts", params, callback, options

####################################################
# -- Organization Metrics --
# GET /v3/organization/brand_messages

	getOrganizationBrandMessages: (params, callback, options) ->
		@get "/v3/organization/brand_messages", params, callback, options

####################################################
# GET /v3/organization/intersecting_links

	getOrganizationIntersectingLinks: (params, callback, options) ->
		@get "/v3/organization/intersecting_links", params, callback, options

####################################################
# GET /v3/organization/leaderboard

	getOrganizationLeaderboard: (params, callback, options) ->
		@get "/v3/organization/leaderboard", params, callback, options

####################################################
# GET /v3/organization/missed_opportunities

	getOrganizationMissedOpportunities: (params, callback, options) ->
		@get "/v3/organization/missed_opportunities", params, callback, options

####################################################
# -- Bundles --
# GET /v3/bundle/archive

	archiveBundle: (params, callback, options) ->
		@get "/v3/bundle/archive", params, callback, options

####################################################
# GET /v3/bundle/bundles_by_user

	bundlesByUser: (params, callback, options) ->
		@get "/v3/bundle/bundles_by_user", params, callback, options

####################################################
# GET /v3/bundle/clone

	cloneBundle: (params, callback, options) ->
		@get "/v3/bundle/clone", params, callback, options

####################################################
# GET /v3/bundle/collaborator_add

	addCollaboratorToBundle: (params, callback, options) ->
		@get "/v3/bundle/collaborator_add", params, callback, options

####################################################
# GET /v3/bundle/collaborator_remove

	removeCollaboratorFromBundle: (params, callback, options) ->
		@get "/v3/bundle/collaborator_remove", params, callback, options

####################################################
# GET /v3/bundle/contents

	getBundleContents: (params, callback, options) ->
		@get "/v3/bundle/contents", params, callback, options

####################################################
# GET /v3/bundle/create

	createBundle: (params, callback, options) ->
		@get "/v3/bundle/create", params, callback, options

####################################################
# GET /v3/bundle/edit

	editBundle: (params, callback, options) ->
		@get "/v3/bundle/edit", params, callback, options

####################################################
# GET /v3/bundle/link_add

	addLinkToBundle: (params, callback, options) ->
		@get "/v3/bundle/link_add", params, callback, options

####################################################
# GET /v3/bundle/link_comment_add

	addCommentToBundleLink: (params, callback, options) ->
		@get "/v3/bundle/link_comment_add", params, callback, options

####################################################
# GET /v3/bundle/link_comment_edit

	editBundleLinkComment: (params, callback, options) ->
		@get "/v3/bundle/link_comment_edit", params, callback, options

####################################################
# GET /v3/bundle/link_comment_remove

	removeBundleLinkComment: (params, callback, options) ->
		@get "/v3/bundle/link_comment_remove", params, callback, options

####################################################
# GET /v3/bundle/link_edit

	editBundleLink: (params, callback, options) ->
		@get "/v3/bundle/link_edit", params, callback, options

####################################################
# GET /v3/bundle/link_remove

	removeBundleLink: (params, callback, options) ->
		@get "/v3/bundle/link_remove", params, callback, options

####################################################
# GET /v3/bundle/link_reorder

	reorderBundleLink: (params, callback, options) ->
		@get "/v3/bundle/link_reorder", params, callback, options

####################################################
# GET /v3/bundle/pending_collaborator_remove

	removePendingCollaboratorFromBundle: (params, callback, options) ->
		@get "/v3/bundle/pending_collaborator_remove", params, callback, options

####################################################
# GET /v3/bundle/reorder

	reorderBundle: (params, callback, options) ->
		@get "/v3/bundle/reorder", params, callback, options

####################################################
# GET /v3/bundle/view_count

	getBundleViewCount: (params, callback, options) ->
		@get "/v3/bundle/view_count", params, callback, options

####################################################
# GET /v3/user/bundle_history

	getUserBundleHistory: (params, callback, options) ->
		@get "/v3/user/bundle_history", params, callback, options

####################################################
# -- Domains --
# GET /v3/bitly_pro_domain

	getBitlyProDomain: (params, callback, options) ->
		@get "/v3/bitly_pro_domain", params, callback, options

####################################################
# GET /v3/user/tracking_domain_clicks

	getTrackingDomainClicks: (params, callback, options) ->
		@get "/v3/user/tracking_domain_clicks", params, callback, options

####################################################
# GET /v3/user/tracking_domain_shorten_counts

	getTrackingDomainShortens: (params, callback, options) ->
		@get "/v3/user/tracking_domain_shorten_counts", params, callback, options

module.exports = BitlyAPI;