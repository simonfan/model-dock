/**
 * @module archetypo
 * @submodule view.dock.attach
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	var initModelDom = require('./model-to-dom/initialize'),
		initDomModel = require('./dom-to-model/initialize');

	/**
	 * Initialization for attachment and detachment logic.
	 *
	 * @method initialize
	 * @param view {backbone.view Object}
	 * @param map {Object}
	 */
	module.exports = function initializeAttach() {

		// invoke rendering.
		this.render();

		// initialize model-to-dom attach logic.
		initModelDom.call(this);
		initDomModel.call(this);

		// if a model was defined, use it.
		// otherwise, create a new model
		var model = this.model || backbone.model();

		this.attach(model);
	};
});
