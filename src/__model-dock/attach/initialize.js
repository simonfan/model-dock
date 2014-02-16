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
		initModelDom = require('./model-to-dom/initialize'),
		initDomModel = require('./dom-to-model/initialize');

	/**
	 * Initialization for attachment and detachment logic.
	 *
	 * @method initialize
	 * @param view {backbone.view Object}
	 * @param map {Object}
	 */
	module.exports = function initializeAttach(view, map, model) {

		// initialize model-to-dom attach logic.
		initModelDom.call(this);
		initDomModel.call(this);

		// if a model was passed, attach it to the dock.
		if (model) {
			this.attach(model);
		}
	};
});
