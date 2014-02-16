/**
 * @module backbone.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var update = require('./update');

	module.exports = function attachDomToModel(model) {
		// Listen to changes on input elements
		// within the and call an update
		// whenever changes occur.
		this.$el.on('change', this.inputSelector, _.bind(update, this));
	};
});
