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
		@checkConfig()

	checkConfig: () ->
		if not @config
			throw "Bitly config error: no config at time of creation"

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

	getHighvalueLinks: (params, callback) ->
		@get "/v3/highvalue", params, callback

####################################################
# GET /v3/search

	search: (params, callback) ->
		@get "/v3/search", params, callback

####################################################
# GET /v3/realtime/bursting_phrases

	getRealtimeBurstingPhrases: (params, callback) ->
		@get "/v3/realtime/bursting_phrases", params, callback

####################################################
# GET /v3/realtime/hot_phrases

	getRealtimeHotPhrases: (params, callback) ->
		@get "/v3/realtime/hot_phrases", params, callback

####################################################
# GET /v3/realtime/clickrate

	getRealtimeClickrate: (params, callback) ->
		@get "/v3/realtime/clickrate", params, callback

####################################################
# GET /v3/link/info

	getLinkFullInfo: (params, callback) ->
		@get "/v3/link/info", params, callback

####################################################
# GET /v3/link/content
	
	getLinkContent: (params, callback) ->
		@get "/v3/link/content", params, callback

####################################################
# GET /v3/link/category

	getLinkCategory: (params, callback) ->
		@get "/v3/link/category", params, callback

####################################################
# GET /v3/link/social

	getLinkSocial: (params, callback) ->
		@get "/v3/link/social", params, callback

####################################################
# GET /v3/link/location

	getLinkLocation: (params, callback) ->
		@get "/v3/link/location", params, callback

####################################################
# GET /v3/link/language

	getLinkLanguage: (params, callback) ->
		@get "/v3/link/language", params, callback

####################################################
# Links
# GET /v3/expand

	expand: (params, callback) ->
		@get "/v3/expand", params, callback

####################################################
# GET /v3/info

	getLinkInfo: (params, callback) ->
		@get "/v3/info", params, callback

####################################################
# GET /v3/link/lookup

	linkLookup: (params, callback) ->
		@get "/v3/link/lookup", params, callback

####################################################
# GET /v3/shorten

	shorten: (params, callback) ->
		@get "/v3/shorten", params, callback

####################################################
# GET /v3/user/link_edit

	userEditLink: (params, callback) ->
		@get "/v3/user/link_edit", params, callback

####################################################
# GET /v3/user/link_lookup

	userLookupLink: (params, callback) ->
		@get "/v3/user/link_lookup", params, callback

####################################################
# GET /v3/user/link_save

	userSaveLink: (params, callback) ->
		@get "/v3/user/link_save", params, callback

####################################################
# GET /v3/user/save_custom_domain_keyword
	
	userSaveCustomDomainKeyword: (params, callback) ->
		@get "/v3/user/save_custom_domain_keyword", params, callback

####################################################
# Link Metrics
# GET /v3/link/clicks

	getLinkClicks: (params, callback) ->
		@get "/v3/link/clicks", params, callback

####################################################
# GET /v3/link/countries

	getLinkCountries: (params, callback) ->
		@get "/v3/link/countries", params, callback

####################################################
# GET /v3/link/encoders

	getLinkEncoders: (params, callback) ->
		@get "/v3/link/encoders", params, callback

####################################################
# GET /v3/link/encoders_by_count
	getLinkEncodersByCount: (params, callback) ->
		@get "/v3/link/encoders_by_count", params, callback

####################################################
# GET /v3/link/encoders_count

	getLinkEncodersCount: (params, callback) ->
		@get "/v3/link/encoders_count", params, callback

####################################################
# GET /v3/link/referrers

	getLinkReferrers: (params, callback) ->
		@get "/v3/link/referrers", params, callback

####################################################
# GET /v3/link/referrers_by_domain

	getLinkReferrersByDomain: (params, callback) ->
		@get "/v3/link/referrers_by_domain", params, callback

####################################################
# GET /v3/link/referring_domains

	getLinkReferringDomains: (params, callback) ->
		@get "/v3/link/referring_domains", params, callback

####################################################
# GET /v3/link/shares

	getLinkShares: (params, callback) ->
		@get "/v3/link/shares", params, callback

####################################################
# -- User Info/History --
# GET: /v3/oauth/app

	getAppInfo: (params, callback) ->
		@get "/v3/oauth/app", params, callback

####################################################
# GET /v3/user/info

	getUserInfo: (login, callback) ->
		@get "/v3/user/info", login, callback

####################################################
# GET /v3/user/link_history

	getUserLinkHistory: (params, callback) ->
		@get "/v3/user/link_history", params, callback

####################################################
# GET /v3/user/network_history

	getUserNetworkHistory: (params, callback) ->
		@get "/v3/user/network_history", params, callback

####################################################
# GET /v3/user/tracking_domain_list

	getUserTrackingDomains: (params, callback) ->
		@get "/v3/user/tracking_domain_list", params, callback

####################################################
# -- User Metrics --
# GET /v3/user/clicks

	getUserClicks: (params, callback) ->
		@get "/v3/user/clicks", params, callback

####################################################
# GET /v3/user/countries

	getUserCountries: (params, callback) ->
		@get "/v3/user/countries", params, callback

####################################################
# GET /v3/user/popular_earned_by_clicks

	getUserPopularEarnedByClicks: (params, callback) ->
		@get "/v3/user/popular_earned_by_clicks", params, callback

####################################################
# GET /v3/user/popular_earned_by_shortens

	getUserPopularEarnedByShortens: (params, callback) ->
		@get "/v3/user/popular_earned_by_shortens", params, callback

####################################################
# GET /v3/user/popular_links

	getUserPopularLinks: (params, callback) ->
		@get "/v3/user/popular_links", params, callback

####################################################
# GET /v3/user/popular_owned_by_clicks

	getUserPopularOwnedByClicks: (params, callback) ->
		@get "/v3/user/popular_owned_by_clicks", params, callback

####################################################
# GET /v3/user/popular_owned_by_shortens

	getUserPopularOwnedByShortens: (params, callback) ->
		@get "/v3/user/popular_owned_by_shortens", params, callback

####################################################
# GET /v3/user/referrers

	getUserReferrers: (params, callback) ->
		@get "/v3/user/referrers", params, callback

####################################################
# GET /v3/user/referring_domains

	getUserReferringDomains: (params, callback) ->
		@get "/v3/user/referring_domains", params, callback

####################################################
# GET /v3/user/share_counts

	getUserShareCounts: (params, callback) ->
		@get "/v3/user/share_counts", params, callback

####################################################
# GET /v3/user/share_counts_by_share_type

	getUserShareCountsByShareType: (params, callback) ->
		@get "/v3/user/share_counts_by_share_type", params, callback

####################################################
# GET /v3/user/shorten_counts

	getUserShortenCounts: (params, callback) ->
		@get "/v3/user/shorten_counts", params, callback

####################################################
# -- Organization Metrics --
# GET /v3/organization/brand_messages

	getOrganizationBrandMessages: (params, callback) ->
		@get "/v3/organization/brand_messages", params, callback

####################################################
# GET /v3/organization/intersecting_links

	getOrganizationIntersectingLinks: (params, callback) ->
		@get "/v3/organization/intersecting_links", params, callback

####################################################
# GET /v3/organization/leaderboard

	getOrganizationLeaderboard: (params, callback) ->
		@get "/v3/organization/leaderboard", params, callback

####################################################
# GET /v3/organization/missed_opportunities

	getOrganizationMissedOpportunities: (params, callback) ->
		@get "/v3/organization/missed_opportunities", params, callback

####################################################
# -- Bundles --
# GET /v3/bundle/archive

	archiveBundle: (params, callback) ->
		@get "/v3/bundle/archive", params, callback

####################################################
# GET /v3/bundle/bundles_by_user

	bundlesByUser: (params, callback) ->
		@get "/v3/bundle/bundles_by_user", params, callback

####################################################
# GET /v3/bundle/clone

	cloneBundle: (params, callback) ->
		@get "/v3/bundle/clone", params, callback

####################################################
# GET /v3/bundle/collaborator_add

	addCollaboratorToBundle: (params, callback) ->
		@get "/v3/bundle/collaborator_add", params, callback

####################################################
# GET /v3/bundle/collaborator_remove

	removeCollaboratorFromBundle: (params, callback) ->
		@get "/v3/bundle/collaborator_remove", params, callback

####################################################
# GET /v3/bundle/contents

	getBundleContents: (params, callback) ->
		@get "/v3/bundle/contents", params, callback

####################################################
# GET /v3/bundle/create

	createBundle: (params, callback) ->
		@get "/v3/bundle/create", params, callback

####################################################
# GET /v3/bundle/edit

	editBundle: (params, callback) ->
		@get "/v3/bundle/edit", params, callback

####################################################
# GET /v3/bundle/link_add

	addLinkToBundle: (params, callback) ->
		@get "/v3/bundle/link_add", params, callback

####################################################
# GET /v3/bundle/link_comment_add

	addCommentToBundleLink: (params, callback) ->
		@get "/v3/bundle/link_comment_add", params, callback

####################################################
# GET /v3/bundle/link_comment_edit

	editBundleLinkComment: (params, callback) ->
		@get "/v3/bundle/link_comment_edit", params, callback

####################################################
# GET /v3/bundle/link_comment_remove

	removeBundleLinkComment: (params, callback) ->
		@get "/v3/bundle/link_comment_remove", params, callback

####################################################
# GET /v3/bundle/link_edit

	editBundleLink: (params, callback) ->
		@get "/v3/bundle/link_edit", params, callback

####################################################
# GET /v3/bundle/link_remove

	removeBundleLink: (params, callback) ->
		@get "/v3/bundle/link_remove", params, callback

####################################################
# GET /v3/bundle/link_reorder

	reorderBundleLink: (params, callback) ->
		@get "/v3/bundle/link_reorder", params, callback

####################################################
# GET /v3/bundle/pending_collaborator_remove

	removePendingCollaboratorFromBundle: (params, callback) ->
		@get "/v3/bundle/pending_collaborator_remove", params, callback

####################################################
# GET /v3/bundle/reorder

	reorderBundle: (params, callback) ->
		@get "/v3/bundle/reorder", params, callback

####################################################
# GET /v3/bundle/view_count

	getBundleViewCount: (params, callback) ->
		@get "/v3/bundle/view_count", params, callback

####################################################
# GET /v3/user/bundle_history

	getUserBundleHistory: (params, callback) ->
		@get "/v3/user/bundle_history", params, callback

####################################################
# -- Domains --
# GET /v3/bitly_pro_domain

	getBitlyProDomain: (params, callback) ->
		@get "/v3/bitly_pro_domain", params, callback

####################################################
# GET /v3/user/tracking_domain_clicks

	getTrackingDomainClicks: (params, callback) ->
		@get "/v3/user/tracking_domain_clicks", params, callback

####################################################
# GET /v3/user/tracking_domain_shorten_counts

	getTrackingDomainShortens: (params, callback) ->
		@get "/v3/user/tracking_domain_shorten_counts", params, callback

module.exports = BitlyAPI;