define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	function proxyEvent() {

		this.trigger.apply(this, arguments);

	}

	/**
	 * Initialization for attachment and detachment logic.
	 *
	 * @method initialize
	 * @param view {backbone.view Object}
	 * @param map {Object}
	 */
	module.exports = function proxyEvents() {
		this.listenTo(this.model, 'all', proxyEvent);
	};
});
