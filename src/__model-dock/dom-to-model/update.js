/**
 * @module backbone.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery');

	// reads the value from DOM elements.
	var readDomValue = require('./read-dom-value');

	/**
	 * Method used to hanlde changes on input elements within
	 * the.
	 *
	 * Very close-bound to the way bindInput works.
	 *
	 * @method updateModel
	 * @_private_
	 * @param e {Event}
	 */
	module.exports = function updateModel(e) {
			// wrap the target into a jquery object
		var $target = $(e.target),
			// retrieve the attribute that the target is bound to
			attribute = $target.data('_dock_-bound-attribute');

		if (attribute) {
			// only update if the element
			// has an attribute bound to it.

			// [1] retrieve the $el
			var selector = $target.data('_dock_-selector'),
				$el = this.$els[selector];

			// console.log(this.$els);

			// console.log('read ' + selector);
			// console.log($el);

			// [2] read the value and parse it
			var value = readDomValue($el),
				parse = this.parsers[attribute];

			value = parse ? parse.call(this, value) : value;

			// [3] set.
			this.model.set(attribute, value);
		}
	};
});
