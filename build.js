
require.config({

	// Optimization config
	optimize: 'none',
	generateSourceMaps: true,
	preserveLicenseComments: true,

	// Dependencies
	paths: {
		head:      'empty:',
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
