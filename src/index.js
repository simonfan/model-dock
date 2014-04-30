//     model-dock
//     (c) simonfan
//     model-dock is licensed under the MIT terms.

/**
 * The dock is the object that links together $els and models.
 *
 * @module model-dock
 * @submodule $el.dock
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	// initializers
	var initAttach = require('./__model-dock/initialize-attach');

	/**
	 * The constructor for the dock object.
	 *
	 * @method dock
	 * @constructor
	 * @param extensions {Object}
	 *     @param $el {Object}
	 *         The $el that owns the dock object
	 *     @param map {Object}
	 *         Map that links selectors to attributes
	 *     @param [model] {Object}
	 *         Optionally provide a model that will initially fill the $el.
	 */
	var dock = module.exports = backbone.view.extend({

		initialize: function initialize() {
			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelDock.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modeldock.
		 *
		 * @method initializeModelDock
		 * @param options {Object}
		 */
		initializeModelDock: function initializeModelDock(options) {

			this.map = options.map || this.map;
			this.model = options.model || this.model;
			this.parsers = options.parsers || this.parsers;
			this.sringifiers = options.stringifiers || this.stringifiers;
			this.cache$Els = options.cache$Els || this.cache$Els;

			// initialize attach
			initAttach.apply(this, arguments);
		},

		/**
		 * The model this dock object should listen to.
		 *
		 * @property model
		 */
		model: void(0),

		/**
		 * Map that identifies selectors for attribvutes.
		 *
		 * @property map
		 */
		map: {},
	});

	// methods related to attaching and detaching models from the dock
	dock.proto(require('./__model-dock/methods'));
});
