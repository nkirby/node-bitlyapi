# node-bitlyapi

A NodeJS interface for the public Bitly API

For more information about the Bitly API: [dev.bitly.com](http://dev.bitly.com "Bitly API")

### Dependencies

node-bitlyapi requires both the btoa and request node modules (installed via NPM)

## Usage

node-bitlyapi uses Bitly's OAuth implementation, so you'll need to register an OAuth application with them.
[Register a Bitly OAuth app](https://bitly.com/a/oauth_apps "Bitly OAuth Apps")

	var BitlyAPI = require("node-bitlyapi");
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

## The Bitly Object

Each of the public Bitly API endpoints are mapped and available with the following method signature

	Bitly.[method name](parameters, callback(error, response){

	});

For Example:

	Bitly.shorten({longUrl:"https://github.com/nkirby/node-bitlyapi"}, function(err, results) {
		// Do something with your new, shorter url...
	});

Where parameters is a key-value object {} according to Bitly's API documentation. 

To see the full mapping of the Bitly API, visit [The Wiki](https://github.com/nkirby/node-bitlyapi/wiki/The-Bitly-Object "The Bitly Object Wiki")

## Helpers

To make navigating the Bitly API a bit easier, a handful of small wrapper objects & methods have been provided to make your life a bit easier. 

### Shortening

Since the vast majority of Bitly's usage is through shortening, I've provided a simpler alternative to the standard Bitly.shorten mapping:

	Bitly.shortenLink("https://github.com/nkirby/node-bitlyapi", function(err, results) {

	});

### Objects

The following objects are provided to wrap the API in a friendlier manner

#### BitlyUser
	
	Bitly.user()
	Bitly.user('login')
	Bitly.user('login').getLinkHistory(null, function(err, results) {
		// Gets the public link history of "login"
	});

For more information about a BitlyUser - Wiki

#### BitlyLink

	Bitly.link('http://bit.ly/1eOHYrA')
	Bitly.link('http://bit.ly/1eOHYrA').getInfo(function(err, results) {

	});

For more information about a BitlyLink - Wiki

#### BitlyBundle

	Bitly.bundle([TBD])

For more information about a BitlyBundle - Wiki

#### BitlyBundleLink

	Bitly.bundleLink([TBD])

For more information about a BitlyBundleLink - Wiki

