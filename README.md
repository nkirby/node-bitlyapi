# node-bitlyapi

A NodeJS interface for the public Bitly API

For more information about the Bitly API: [dev.bitly.com](http://dev.bitly.com "Bitly API")

### Dependencies

node-bitlyapi requires both the btoa and request node modules (installed via NPM)

## Usage

node-bitlyapi uses Bitly's OAuth implementation, so you'll need to register an OAuth application with them.
[Register a Bitly OAuth app](https://bitly.com/a/oauth_apps "Bitly OAuth Apps")

	var BitlyAPI = require("node-bitly");
	var Bitly = new BitlyAPI({
		client_id: "Something",
		client_secret: "Something"	
	});

You can then either authenticate using your username and password

	Bitly.authenticate(username, password, function(err, access_token) {
		// Returns an error if there was one, or an access_token if there wasn't 
	});

or if you know your OAuth access_token, you can simply call:

	Bitly.setAccessToken(access_token);

## Bitly API

Each of the public Bitly API endpoints are mapped and available with the following method signature

	Bitly.[method name](parameters, callback(error, response){

	});

Where parameters is a key-value object {} according to Bitly's API documentation. The following is a listing of all implemented endpoings, followed by their
relative path to the Bitly API

#### Data APIs

/v3/highvalue

	Bitly.getHighvalueLinks()

/v3/search

	Bitly.search()

/v3/realtime/bursting_phrases

	Bitly.getRealtimeBurstingPhrases()

/v3/realtime/hot_phrases

	Bitly.getRealtimeHotPhrases()

/v3/realtime/clickrate

	Bitly.getRealtimeClickrate()

/v3/link/info

	Bitly.getLinkFullInfo()

/v3/link/content

	Bitly.getLinkContent()

/v3/link/category
	
	Bitly.getLinkCategory()

/v3/link/social

	Bitly.getLinkSocial()

/v3/link/location

	Bitly.getLinkLocation()

/v3/link/language

	Bitly.getLinkLanguage()

## Helper Objects
