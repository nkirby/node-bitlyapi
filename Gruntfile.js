// ================================================
// node-bitlyapi
// Grunt build file for local development. Including this in the repo
// in case people really want to build themselves a node module from
// the CoffeeScript provided.
// ================================================

module.exports = function(grunt) {
	grunt.initConfig({
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

		watch: {
			bitly: {
				files: "src/*.coffee",
				tasks: ["coffee:bitly"],
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	grunt.registerTask("default", ["coffee", "watch"]);
};
