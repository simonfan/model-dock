require.config({
	urlArgs: 'bust=0.3164935759268701',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'model-dock': 'index',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		jquery: '../bower_components/jquery/dist/jquery',
		qunit: '../bower_components/qunit/qunit/qunit',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		subject: '../bower_components/subject/built/subject',
		backbone: '../bower_components/backbone/backbone',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
