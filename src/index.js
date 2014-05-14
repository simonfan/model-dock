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

	var dock     = require('dock'),
		Backbone = require('backbone');



	var modelDock = module.exports = dock.extend({
		attachmentAttribute: 'model',

		afterAttach: function afterAttach(model, options) {

			// trigger events on all events of the model.
			this.listenTo(model, 'all', this.trigger);

			// trigger attach event.
			if (!options || !options.silent) {
				this.trigger('attach', model, options);
			}

		},

		afterDetach: function afterDetach(model, options) {
			// remove event listeners
			this.stopListening(model, 'all');


			// trigger detach event.
			if (!options || !options.silent) {
				this.trigger('detach', model, options);
			}

		},
	});

	// events
	modelDock.assignProto(Backbone.Events);

	// proxies

	// proxy methods
	modelDock.defineProxies([
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
	]);

	// proxy properties
	modelDock.defineProxies([
		'id', 'idAttribute', 'cid', 'attributes',
		'changed', 'defaults',
		'validationError',
		'urlRoot',
	]);
});
