/*
 * Copyright 2013, Emanuel Rabina (http://www.ultraq.net.nz/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Bower package manager
		bower: {
			target: {
				rjsConfig: 'Config.js'
			}
		},

		// RequireJS optimizer
		requirejs: {
			compile: {
				options: {
					mainConfigFile: 'Config.js'
				}
			}
		},

		// Watch configuration
		watch: {
			scripts: {
				files: 'Source/*.js',
				tasks: 'requirejs'
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-bower-requirejs');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Define additional tasks
	grunt.registerTask('default', ['requirejs']);
};
