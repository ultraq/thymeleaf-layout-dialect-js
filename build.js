
require.config({

	// Optimization config
	optimize: 'none',
	generateSourceMaps: true,
	preserveLicenseComments: true,

	// Dependencies
	paths: {
		head:      '../bower_components/headjs/dist/1.0.0/head',
		jquery:    '../bower_components/jquery/dist/jquery',
		requirejs: '../bower_components/requirejs/require',
		thymol:    'empty:'
	},
	include: 'requirejs',

	// Layout dialect modules
	baseUrl: 'Source/',
	name: 'LayoutDialect',
	out: 'thymeleaf-layout-dialect.js'
});
