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

/* eslint-env node */
'use strict';

const webpack = require('webpack');
const yargs   = require('yargs');

const path = require('path');

let argv = yargs.argv;
let isDev = !!argv.dev;

module.exports = {
	entry: './Source/LayoutDialect.js',
	output: {
		filename: 'thymeleaf-layout-dialect.js',
		path: __dirname
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'Source'),
				loader: 'babel-loader'
			}
		]
	},
	plugins: !isDev ? [
		new webpack.optimize.UglifyJsPlugin()
	] : [],
	devtool: isDev ? '#source-map' : ''
};
