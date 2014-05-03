
require.config({

	// Optimization config
	optimize: 'none',
	generateSourceMaps: true,
	preserveLicenseComments: true,

	// Dependencies
	paths: {
		domready:  '../bower_components/domready/ready',
		head:      '../bower_components/head/head',
		jquery:    'empty:',
		requirejs: '../bower_components/requirejs/require',
		thymol:    'empty:'
	},
	include: 'requirejs',

	// Layout dialect modules
	baseUrl: 'Source/',
	name: 'LayoutDialect',
	out: 'thymeleaf-layout-dialect.js'
});
