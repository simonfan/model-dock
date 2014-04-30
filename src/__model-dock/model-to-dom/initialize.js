/**
 * @module archetypo
 * @submodule $el.dock.attach
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var filler = require('jquery.filler');

	/**
	 *
	 *
	 * @method initialize
	 * @param $el {backbone.$el Object}
	 * @param map {Object}
	 */
	var initialize = module.exports = function initialize() {
		/**
		 * The function that will fill in html for us.
		 * Uses jquery.filler to build a cache of the
		 * jquery DOM selections.
		 *
		 * @method fill
		 * @param data {Object}
		 */
		this.fill = this.$el.filler(this.map);
	};
});
