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


