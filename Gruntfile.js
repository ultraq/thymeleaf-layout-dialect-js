
module.exports = function(grunt) {
	'use strict';

	var sourceFiles = 'Source/**/*.js';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Extra command-line tasks
		shell: {
			'bower-install': {
				command: 'bower install'
			}
		},

		// JSHint configuration
		jshint: {
			options: {
				jshintrc: true
			},
			files: sourceFiles
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
			files: sourceFiles,
			tasks: ['build']
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	// Define additional tasks
	grunt.registerTask('build', ['jshint', 'requirejs']);
	grunt.registerTask('default', ['shell:bower-install', 'build']);
};
