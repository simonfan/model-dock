/**
 * The dock is the object that links together views and models.
 *
 * @module archetypo
 * @submodule view.dock
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.invokeModelMethod = function invokeModelMethod(method, args) {
		var model = this.model;

		if (model) {
			return model[method].apply(model, args);
		}
	};

	var methods = ['set', 'get', 'save'];

	_.each(methods, function (method) {
		exports[method] = function () {
			return this.invokeModelMethod(method, arguments);
		};
	});
});
