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
		@bitly.getUserLinkHistory params, callback

	getNetworkHistory: (params, callback) ->
		@bitly.getUserNetworkHistory params, callback

	getTrackingDomains: (params, callback) ->
		@bitly.getUserTrackingDomains params, callback

####################################################
# User Metrics

	getClicks: (params, callback) ->
		@bitly.getUserClicks params, callback

	getCountries: (params, callback) ->
		@bitly.getUserCountries params, callback

	getPopularEarnedByClicks: (params, callback) ->
		@bitly.getUserPopularEarnedByClicks params, callback

	getPopularEarnedByShortens: (params, callback) ->
		@bitly.getUserPopularEarnedByShortens params, callback

	getPopularLinks: (params, callback) ->
		@bitly.getUserPopularLinks params, callback

	getPopularOwnedByClicks: (params, callback) ->
		@bitly.getUserPopularOwnedByClicks params, callback

	getPopularOwnedByShortens: (params, callback) ->
		@bitly.getUserPopularOwnedByShortens params, callback

	getReferrers: (params, callback) ->
		@bitly.getUserReferrers params, callback

	getReferringDomains: (params, callback) ->
		@bitly.getUserReferringDomains params, callback

	getShareCounts: (params, callback) ->
		@bitly.getUserShareCounts params, callback

	getShareCountsByShareType: (params, callback) ->
		@bitly.getUserShareCountsByShareType params, callback

	getShortenCounts: (params, callback) ->
		@bitly.getUserShortenCounts params, callback
