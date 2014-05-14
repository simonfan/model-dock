
//     dock
//     (c) simonfan
//     dock is licensed under the MIT terms.

define("dock",["require","exports","module","lodash","subject"],function(t,e,i){var a=t("lodash"),n=t("subject"),h=i.exports=n({initialize:function(t){this.initializeDock(t)}});h.assignProto({initializeDock:function(t){t&&t[this.attachmentAttribute]&&this.attach(t[this.attachmentAttribute])},attach:function(t,e){return this.detach(e),this.beforeAttach(t,e),this[this.attachmentAttribute]=t,this.afterAttach(t,e),this},detach:function(t){var e=this[this.attachmentAttribute];return e&&(this.beforeDetach(e,t),delete this[this.attachmentAttribute],this.afterDetach(e,t)),this}},{writable:!1,enumerable:!1}),h.assignProto({attachmentAttribute:"attachment",beforeAttach:a.noop,afterAttach:a.noop,beforeDetach:a.noop,afterDetach:a.noop}),h.assignStatic({defineProxies:function(t){return this.assignProto(t,{get:function(t){var e=this[this.attachmentAttribute],i=e[t];return a.isFunction(i)?a.bind(i,e):i},set:function(t,e){this[this.attachmentAttribute][t]=e}}),this},extendProxies:function(t){var e=this.extend();return e.defineProxies(t),e}})});
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

/* jshint ignore:end */

define('model-dock',['require','exports','module','lodash','dock','backbone'],function (require, exports, module) {
	

	var _        = require('lodash'),
		dock     = require('dock'),
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
