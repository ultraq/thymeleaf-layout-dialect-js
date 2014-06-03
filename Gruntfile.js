
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
			all: {
				files: sourceFiles
			}
		},

		// RequireJS optimizer
		requirejs: {
			optimize: {
				options: {
					optimize: 'uglify2',
					uglify2: {
						mangle: false
					},
					generateSourceMaps: true,
					preserveLicenseComments: false,
					baseUrl: 'Source/',
					paths: {
						requirejs: '../bower_components/requirejs/require',
						thymol:    '../bower_components/thymol/dist/thymol'
					},
					include: 'requirejs',
					name: 'LayoutDialect',
					out: 'thymeleaf-layout-dialect.min.js'
				}
			}
		},

		// Watch configuration
		watch: {
			options: {
				atBegin: true
			},
			js: {
				files: sourceFiles,
				tasks: ['newer:jshint:all', 'requirejs']
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-shell');

	// Define additional tasks
	grunt.registerTask('build', ['jshint', 'requirejs']);
	grunt.registerTask('default', ['shell:bower-install', 'build']);
};
