/**
 * The dock is the object that links together $els and models.
 *
 * @module archetypo
 * @submodule $el.dock
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	// initializers
	var initAttach = require('./__model-dock/attach/initialize');

	/**
	 * The constructor for the dock object.
	 *
	 * @method dock
	 * @constructor
	 * @param $el {Object}
	 *     The $el that owns the dock object
	 * @param map {Object}
	 *     Map that links selectors to attributes
	 * @param [model] {Object}
	 *     Optionally provide a model that will initially fill the $el.
	 */
	var dock = module.exports = subject(function modelDock($el, map, model) {
		/**
		 * The $el that owns this dock object.
		 *
		 * @property $el
		 */
		this.$el = $el || this.$el;
		this.map = map || this.map;
		this.model = model || this.model;

		// initialize attach
		initAttach.apply(this, arguments);
	});

	dock.proto({
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
	dock.proto(require('./__model-dock/attach/index'));

	// the methods that emulate model action.
	dock.proto(require('./__model-dock/proxy'));
});
