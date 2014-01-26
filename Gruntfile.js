// ================================================
// node-bitlyapi
// Grunt build file for local development. Including this in the repo
// in case people really want to build themselves a node module from
// the CoffeeScript provided.
// ================================================

module.exports = function(grunt) {
	banner = "// ================================================\n" +
				"// BitlyAPI\n" +
				"// A NodeJS interface for the Public Bitly API\n" +
				"// Nathaniel Kirby <nate@projectspong.com\n" +
				"// https://github.com/nkirby/node-bitlyapi\n" +
				"// ================================================\n";

	grunt.initConfig({
		coffee: {
			bitly: {
				options: {
					banner: banner,
					join: true
				},
				files: {
					"lib/bitly.js": "src/*.coffee",
				}
			},
		},

		usebanner: {
			bitly: {
				options: {
					position: 'top',
					banner: banner,
					linebreak: true
				},
				files: {
					src: ['lib/bitly.js']
				}
			}
		},

		watch: {
			bitly: {
				files: "src/*.coffee",
				tasks: ["coffee:bitly", "usebanner:bitly"],
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-banner');

	grunt.registerTask("default", ["coffee", "usebanner", "watch"]);
};
