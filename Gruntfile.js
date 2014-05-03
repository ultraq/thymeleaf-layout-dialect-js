
module.exports = function(grunt) {
	'use strict';

	var sourceFiles = 'Source/**/*.js';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Extra command-line tasks
		shell: {
			bowerInstall: {
				command: 'bower install'
			}
		},

		// JSHint configuration
		jshint: {
			options: {
				jshintrc: true
			},
			scripts: {
				src: sourceFiles
			}
		},

		// RequireJS optimizer
		requirejs: {
			optimize: {
				options: {
					mainConfigFile: 'build.js'
				}
			}
		},

		// Watch configuration
		watch: {
			scripts: {
				files: sourceFiles,
				tasks: ['jshint', 'requirejs']
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	// Define additional tasks
	grunt.registerTask('bower-install', ['shell:bowerInstall']);
	grunt.registerTask('default', ['bower-install', 'jshint', 'requirejs']);
};
