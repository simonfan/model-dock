/**
 * @module backbone.view.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property $readers
	 * @private
	 * @type Object
	 */
	var $readers = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {
			if ($el.prop('type') === 'checkbox') {
				return _.map($el.filter(':checked'), function (el) {
					return $(el).val();
				});

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method readDomValue
	 * @param selector {String}
	 */
	module.exports = function readDomValue($el) {

		// [1] retrieve reader function
		var tagName = $el.prop('tagName'),
			reader = $readers[tagName] || $readers['default'];

		// [2] read and return.
		return reader($el);
	};
});
