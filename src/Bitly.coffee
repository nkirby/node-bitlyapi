####################################################
# node-bitlyapi
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitlyapi
####################################################

btoa = require 'btoa'

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

	
	authenticate: (username, password) ->

module.exports = Bitly;