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

	/**
	 * Method used internally to update the html.
	 *
	 * @method update
	 * @_private_
	 * @param model
	 */
	var update = module.exports = function update(model) {

		var stringifiers = this.stringifiers,
			// map out data.
			data = _.mapValues(model.attributes, function (value, attribute) {

			//	console.log(value);
			//	console.log(attribute);

				var stringify = stringifiers[attribute];

				// if no stringify is defined, return the value
				return stringify ? stringify.call(this, value) : value;
			});

		this.fill(data);
	};
});
