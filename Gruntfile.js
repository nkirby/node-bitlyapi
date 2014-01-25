// ================================================
// node-bitly
// ================================================

module.exports = function(grunt) {
	grunt.initConfig({

// ================================================
// CoffeeScript
// ================================================

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
