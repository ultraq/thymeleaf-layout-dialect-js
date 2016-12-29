/* 
 * Copyright 2016, Emanuel Rabina (http://www.ultraq.net.nz/)
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

/**
 * Build/development scripts using gulp.
 */
/* eslint-env node */

const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const gulpIf  = require('gulp-if');
const plumber = require('gulp-plumber');

const runSequence   = require('run-sequence');
const webpackStream = require('webpack-stream');
const yargs         = require('yargs');

const argv = yargs.argv;
const isWatch = argv.watch;


// SCRIPT TASKS
// -----------------------------------------------------------------------------

const js = {
	sourceFiles: [
		'Source/**/*.js'
	],
	main: 'Source/LayoutDialect.js',
	destFile: 'thymeleaf-layout-dialect.js',
	destDir: '.'
};

gulp.task('lint', function() {
	return gulp.src(js.sourceFiles)
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(gulpIf(isWatch, eslint.failAfterError()));
});

gulp.task('build', function() {
	return gulp.src(js.main)
		.pipe(plumber())
		.pipe(webpackStream(require('./webpack.config.js')))
		.pipe(gulp.dest(js.destDir));
});


// TASK ALIASES
// -----------------------------------------------------------------------------

gulp.task('scripts', function(callback) {
	runSequence('lint', 'build', callback);
});

gulp.task('watch', function(callback) {
	function logChanges(event) {
		console.log(`File ${event.path} was ${event.type}`);	// eslint-disable-line no-console
	}
	gulp.watch(js.sourceFiles, ['scripts']).on('change', logChanges);
	runSequence('default', callback);
});

gulp.task('default', function(callback) {
	runSequence('lint', 'build', callback);
});

