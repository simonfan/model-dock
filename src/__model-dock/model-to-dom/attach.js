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

		// Listen to changes on attributes
		// defined at the map.
		// Any changes there should reflect
		// changes on the $el.

		// listenTo always invokes the event handler
		// in 'this' context
		this.listenTo(this.model, 'change', _update);

		// Set initial values
		_update.call(this, this.model);
	};

});
