// ================================================
// node-bitlyapi
// Grunt build file for local development. Including this in the repo
// in case people really want to build themselves a node module from
// the CoffeeScript provided.
// ================================================

module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		banner: "// ================================================\n" +
				"// <%= pkg.name %> - version <%= pkg.version %> \n" +
				"// <%= pkg.description %>\n" +
				"// <%= pkg.author.name %> (<%= pkg.author.email %>)\n" +
				"// <%= pkg.repository.url %>\n" +
				"// ================================================\n",
		coffee: {
			bitly: {
				options: {
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
					banner: "<%= banner %>",
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
