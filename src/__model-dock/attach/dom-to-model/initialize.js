/**
 * @module backbone.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method initialize
	 */
	module.exports = function initializeDomToModel() {

		/**
		 * Hash where elements are referenced
		 * by their selector strings.
		 *
		 * @property $els
		 * @type Object
		 */
		this.$els = {};

		// bind inputs.
		_.each(this.map, _.bind(function (selector, attribute) {

			this.bindInput(selector, attribute);
		}, this));
	};
});
