<img src="http://www.projectspong.com/wp-content/uploads/2014/01/nodebitlyapi2.png" height="200" width="280"/>

# node-bitlyapi

A NodeJS interface for the public Bitly API

For more information about the Bitly API: [dev.bitly.com](http://dev.bitly.com "Bitly API")

### Dependencies

node-bitlyapi requires the btoa, request and querystring node modules (installed via NPM)

### Installation

	npm install node-bitlyapi

### Version

The current published version of node-bitlyapi is 0.4.0. It is API complete, but missing some of the helper objects I intend to create.

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

For more information about a BitlyUser - [Wiki](https://github.com/nkirby/node-bitlyapi/wiki/BitlyUser "BitlyUser")

#### BitlyLink

	Bitly.link('http://bit.ly/1eOHYrA')
	Bitly.link('http://bit.ly/1eOHYrA').getInfo(function(err, results) {

	});

For more information about a BitlyLink - Wiki

#### BitlyBundle

	To Do.

#### BitlyBundleLink

	To Do.

## Credits & Such

This project was created by Nathaniel Kirby

[nate@projectspong.com](mailto:nate@projectspong.com "nate@projectspong.com")

[@thenatekirby](http://twitter.com/thenatekirby "Nate Kirby on Twitter")

Despite being Bitly's iOS developer, this project doesn't mean that

	a) I know anything more or less about iOS because of it.
	b) Or, inversely, that I know more or less about JavaScript, CoffeeScript or whatever else script is coming up next.
	c) That Bitly approves, condones, supports or even acknowledge this project.

Feel free to use this to make great NodeJS apps using Bitly's API. Your usage of their API is subject to their terms and conditions. Don't be a jackass, or a spammer...or a jackass spammer.

### License

This software is provided via the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
