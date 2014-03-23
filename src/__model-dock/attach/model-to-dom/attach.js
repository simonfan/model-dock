/**
 * @module archetypo
 * @submodule $el.dock.attach
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// update function
	var _update = require('./update');

	/**
	 * Defines attachment logic for binding the model's data to the DOM.
	 *
	 * @method attach
	 * @param model {backbone.model Object}
	 */
	var attach = module.exports = function attach() {

		// bind the update function to this
		var update = _.bind(_update, this);

		// Listen to changes on attributes
		// defined at the map.
		// Any changes there should reflect
		// changes on the $el.
		this.model.on('change', update);

		// Set initial values
		update(this.model);
	};

});
