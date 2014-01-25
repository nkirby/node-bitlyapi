####################################################
# node-bitly
# A NodeJS interface for the Public Bitly API
# Nathaniel Kirby <nate@projectspong.com
# https://github.com/nkirby/node-bitly
####################################################

btoa = require 'btoa'

class Bitly
	constructor: (@config) ->
		@getToken()

	getToken: () ->

module.exports = Bitly;