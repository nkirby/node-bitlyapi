####################################################
# node-bitlyapi
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitlyapi
####################################################

class BitlyLink 
	constructor: (@link, @bitly) ->

####################################################
# Links

	expand: (callback) ->
		@bitly.expand {shortUrl:@link}, callback

	getInfo: (params, callback) ->
		params.shortUrl = @link
		@bitly.getLinkInfo params, callback

	edit: (newInfo, callback) ->
		newKeys = []
		for key,value of newInfo
			newKeys.push key
			params[key] = value
		params.edit = newKeys.join ','
		@bitly.userEditLink params, callback

####################################################
# Link Metrics

	getClicks: (params, callback) ->
		params.link = @link
		@bitly.getLinkClicks params, callback

	getCountries: (params, callback) ->
		params.link = @link
		@bitly.getLinkCountries params, callback

	getEncoders: (params, callback) ->
		params.link = @link
		@bitly.getLinkEncoders params, callback

	getEncodersByCount: (params, callback) ->
		params.link = @link
		@bitly.getEncodersByCount params, callback

	getEncodersCount: (params, callback) ->
		params.link = @link
		@bitly.getLinkEncodersCount params, callback

	getReferrers: (params, callback) ->
		params.link = @link
		@bitly.getLinkReferrers params, callback

	getReferrersByDomain: (params, callback) ->
		params.link = @link
		@bitly.getLinkReferrersByDomain params, callback

	getReferringDomains: (params, callback) ->
		params.link = @link
		@bitly.getLinkReferringDomains params, callback

	getShares: (params, callback) ->
		params.link = @link
		@bitly.getLinKShares params, callback