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
		attachDomModel = require('./dom-to-model/attach');

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


	exports.bindInput = require('./dom-to-model/bind-input');


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
	};


	/**
	 *
	 *
	 * @method detach
	 */
	exports.detach = function detach() {

		if (this.model) {
			// stop listening to old model.
			this.model.off('change', this._updateView);

			// set this model to another value
			this.model = void(0);
		}
	};
});
