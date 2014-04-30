/**
 * @module archetypo
 * @submodule view.dock.attach
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {

	var _ = require('lodash'),
		attachModelDom = require('./model-to-dom/attach'),
		attachDomModel = require('./dom-to-model/attach'),
		proxyEvents = require('./events/proxy');

	/**
	 * Whether to cache or not the selections.
	 *
	 * @property cache$Els
	 * @type boolean
	 */
	exports.cache$Els = true;

	exports.stringifiers = {};

	/**
	 * Hash for the parsers. Every parser function is called
	 * within the's context and takes the value read
	 * from the DOM as arugment.
	 *
	 * @property parsers
	 * @type Object
	 */
	exports.parsers = {};

	/**
	 *
	 *
	 * @method attach
	 * @param model {backbone.model Object}
	 */
	exports.attach = function attach(model) {

		this.detach();

		// set model
		this.model = model;

		// attach model to dom
		attachModelDom.call(this);

		// attach dom to model
		attachDomModel.call(this);

		// proxy events
		proxyEvents.call(this);
	};


	/**
	 *
	 *
	 * @method detach
	 */
	exports.detach = function detach() {

		if (this.model) {
			// Stop listening to all events from the model.
			this.stopListening(this.model);

			// unset this.model
			this.model = void(0);
		}
	};
});
