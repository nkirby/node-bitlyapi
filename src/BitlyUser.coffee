####################################################
# node-bitlyapi
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitlyapi
####################################################

class BitlyUser 
	constructor: (@login, @bitly) ->

####################################################
# User Info / History

	getInfo: (callback) ->
		if @login
			@bitly.getInfoForUser @login, callback
		else
			@bitly.getInfoForUser null, callback

	getLinkHistory: (params, callback) ->
		if @login
			params.user = @login
		@bitly.getLinkHistoryForUser params, callback

	getNetworkHistory: (params, callback) ->
		@bitly.getNetworkHistoryForUser params, callback

	getTrackingDomains: (params, callback) ->
		@bitly.getTrackingDomainsForUser params, callback

####################################################
# User Metrics

	getClicks: (params, callback) ->
		@bitly.getClicksForUser params, callback

	getCountries: (params, callback) ->
		@bitly.getCountriesForUser params, callback

	getPopularEarnedByClicks: (params, callback) ->
		@bitly.getPopularEarnedByClicksForUser params, callback

	getPopularEarnedByShortens: (params, callback) ->
		@bitly.getPopularEarnedByShortensForUser params, callback

	getPopularLinks: (params, callback) ->
		@bitly.getPopularLinksForUser params, callback

	getPopularOwnedByClicks: (params, callback) ->
		@bitly.getPopularOwnedByClicksForUser params, callback

	getPopularOwnedByShortens: (params, callback) ->
		@bitly.getPopularOwnedByShortensForUser params, callback

	getReferrers: (params, callback) ->
		@bitly.getReferrersForUser params, callback

	getReferringDomains: (params, callback) ->
		@bitly.getReferringDomainsForUser params, callback

	getShareCountsForUser: (params, callback) ->
		@bitly.getShareCountsForUser params, callback

	getShareCountsByShareType: (params, callback) ->
		@bitly.getShareCountsByShareTypeForUser params, callback

	getShortenCounts: (params, callback) ->
		@bitly.getShortenCountsForUser params, callback
