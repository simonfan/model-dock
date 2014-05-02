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
		subject = require('subject'),
		Backbone = require('backbone');





	/**
	 * The constructor for the dock object.
	 *
	 * @method dock
	 * @constructor
	 * @param options
	 *     @param [model] {Object}
	 *         Optionally provide a model that will initially fill the $el.
	 */
	var dock = module.exports = subject({
		initialize: function initialize(options) {
			this.initializeModelDock(options);
		},

		initializeModelDock: function initializeModelDock(options) {

			if (options && options.model) {
				this.attach(options.model);
			}
		},

		/**
		 *
		 *
		 *
		 * @method invokeModelMethod
		 * @param method
		 * @params [arguments]
		 */
		invokeModelMethod: function invokeModelMethod(method) {
			if (this.model) {

				var args = Array.prototype.slice.call(arguments, 1);

				return this.model[method].apply(this.model, args);

			} else {
				throw new Error('No model attached to dock. Unable to invoke ' + method);
			}
		},


		retrieveModelProperty: function retrieveModelProperty(property) {
			if (this.model) {

				return this.model[property];

			} else {
				throw new Error('No model attached to dock. Unable to retrieve ' + property);
			}
		},


		/**
		 *
		 *
		 *
		 */
		attach: function attach(model, options) {

			this.detach();

			this.model = model;

			this.listenTo(this.model, 'all', this.trigger);

			// trigger attach event.
			if (!options || !options.silent) {
				this.trigger('attach', model);
			}
		},

		/**
		 *
		 *
		 * @method detach
		 */
		detach: function detach(options) {
			if (this.model) {

				var model = this.model;

				// Stop listening to all events from the model.
				this.stopListening(model);

				// unset this.model
				this.model = void(0);

				// trigger detach event
				if (!options || !options.silent) {
					this.trigger('detach', model);
				}
			}
		},
	});

	// events methods.
	dock.proto(Backbone.Events);

	// proxy methods
	var bbMethodNames = [

			'get', 'set', 'escape', 'has', 'unset', 'clear',
			'toJSON',
			'sync', 'fetch', 'save', 'destroy',
			'keys', 'values', 'pairs', 'invert', 'pick', 'omit',
			'validate', 'isValid',
			'url',
			'parse',
			'clone', 'isNew',
			'hasChanged', 'changedAttributes',
			'previous', 'previousAttributes'
		],
		bbMethods = {};

	_.each(bbMethodNames, function (m) {
		bbMethods[m] = _.partial(dock.prototype.invokeModelMethod, m);
	});

	dock.proto(bbMethods);

	// proxy properties
	var bbPropertyNames = [
			'id', 'idAttribute', 'cid', 'attributes',
			'changed', 'defaults',
			'validationError',
			'urlRoot',
		],
		bbPropertyRetrievalMethods = {};

	_.each(bbPropertyNames, function (n) {
		bbPropertyRetrievalMethods[n] = _.partial(dock.prototype.retrieveModelProperty, n);
	});

	dock.proto(bbPropertyRetrievalMethods);
});
