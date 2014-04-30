
/**
 * @module archetypo
 * @submodule $el.dock.attach
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__model-dock/model-to-dom/initialize',['require','exports','module','jquery.filler'],function (require, exports, module) {
	

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

/**
 * @module backbone.view.model
 * @submodule html-to-model
 */
define('__model-dock/dom-to-model/read-dom-value',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property $readers
	 * @private
	 * @type Object
	 */
	var $readers = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {
			if ($el.prop('type') === 'checkbox') {
				return _.map($el.filter(':checked'), function (el) {
					return $(el).val();
				});

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method readDomValue
	 * @param selector {String}
	 */
	module.exports = function readDomValue($el) {

		// [1] retrieve reader function
		var tagName = $el.prop('tagName'),
			reader = $readers[tagName] || $readers['default'];

		// [2] read and return.
		return reader($el);
	};
});

/**
 * @module backbone.model
 * @submodule html-to-model
 */
define('__model-dock/dom-to-model/update',['require','exports','module','jquery','./read-dom-value'],function (require, exports, module) {
	

	var $ = require('jquery');

	// reads the value from DOM elements.
	var readDomValue = require('./read-dom-value');

	/**
	 * Method used to hanlde changes on input elements within
	 * the.
	 *
	 * Very close-bound to the way bindInput works.
	 *
	 * @method updateModel
	 * @_private_
	 * @param e {Event}
	 */
	module.exports = function updateModel(e) {
			// wrap the target into a jquery object
		var $target = $(e.target),
			// retrieve the attribute that the target is bound to
			attribute = $target.data('_dock_-bound-attribute');

		if (attribute) {
			// only update if the element
			// has an attribute bound to it.

			// [1] retrieve the $el
			var selector = $target.data('_dock_-selector'),
				$el = this.$els[selector];

			// console.log(this.$els);

			// console.log('read ' + selector);
			// console.log($el);

			// [2] read the value and parse it
			var value = readDomValue($el),
				parse = this.parsers[attribute];

			value = parse ? parse.call(this, value) : value;

			// [3] set.
			this.model.set(attribute, value);
		}
	};
});

/**
 * @module backbone.model
 * @submodule html-to-model
 */
define('__model-dock/dom-to-model/bind-input',['require','exports','module','lodash','jquery','./bind-input'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	var bindInput = require('./bind-input');

	/**
	 * Binds the value of the element selected to the attribute.
	 *
	 * @method bindInput
	 * @param selector {String|Array}
	 * @param attribute {String}
	 */
	module.exports = function bindInput(selector, attribute) {

		if (_.isArray(selector)) {

			_.each(selector, _.bind(function (sel) {

				bindInput.call(this, sel, attribute);

			}, this));

		} else {

			// console.log(typeof selector);
			// console.log('store ' + selector);

			// retrieve $el and store it.
			var $el = this.$els[selector] = this.$el.find(selector);

			if ($el.length > 0) {
				$el.data('_dock_-bound-attribute', attribute)
					.data('_dock_-selector', selector);
			}
		}
	};

});

/**
 * @module backbone.model
 * @submodule html-to-model
 */
define('__model-dock/dom-to-model/initialize',['require','exports','module','lodash','./update','./bind-input'],function (require, exports, module) {
	

	var _ = require('lodash');

	// internal
	var update = require('./update'),
		bindInput = require('./bind-input');

	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method initialize
	 */
	module.exports = function initializeDomToModel() {

		/**
		 * Hash where elements are referenced
		 * by their selector strings.
		 *
		 * @property $els
		 * @type Object
		 */
		this.$els = {};

		// bind inputs.
		_.each(this.map, _.bind(function (selector, attribute) {

			bindInput.call(this, selector, attribute);
		}, this));

		// build a selector string that selects the
		// elements that are input
		var selectors = _(this.$els).mapValues(function ($el, selector) {

			if ($el.is(':input')) {
				// it refers to an input
				return selector.replace(/\s*->.*$/, '');
			} else {
				return false;
			}
		})
		.values()
		.compact()
		.join(', ');

		this.$el.on('change', selectors, _.bind(update, this));
	};
});

/**
 * @module archetypo
 * @submodule view.dock.attach
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__model-dock/initialize-attach',['require','exports','module','lodash','lowercase-backbone','./model-to-dom/initialize','./dom-to-model/initialize'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	var initModelDom = require('./model-to-dom/initialize'),
		initDomModel = require('./dom-to-model/initialize');

	/**
	 * Initialization for attachment and detachment logic.
	 *
	 * @method initialize
	 * @param view {backbone.view Object}
	 * @param map {Object}
	 */
	module.exports = function initializeAttach() {

		// initialize model-to-dom attach logic.
		initModelDom.call(this);
		initDomModel.call(this);

		// if a model was defined, use it.
		// otherwise, create a new model
		var model = this.model || backbone.model();

		this.attach(model);
	};
});

/**
 * @module archetypo
 * @submodule $el.dock.attach
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__model-dock/model-to-dom/update',['require','exports','module','lodash'],function (require, exports, module) {
	

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

			//	// console.log(value);
			//	// console.log(attribute);

				var stringify = stringifiers[attribute];

				// if no stringify is defined, return the value
				return stringify ? stringify.call(this, value) : value;
			});

		this.fill(data);
	};
});

/**
 * @module archetypo
 * @submodule $el.dock.attach
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__model-dock/model-to-dom/attach',['require','exports','module','lodash','./update'],function (require, exports, module) {
	

	var _ = require('lodash');

	// update function
	var _update = require('./update');

	/**
	 * Defines attachment logic for binding the model's data to the DOM.
	 *
	 * @method attach
	 * @param model {backbone.model Object}
	 */
	var attach = module.exports = function attach() {

		// Listen to changes on attributes
		// defined at the map.
		// Any changes there should reflect
		// changes on the $el.

		// listenTo always invokes the event handler
		// in 'this' context
		this.listenTo(this.model, 'change', _update);

		// Set initial values
		_update.call(this, this.model);
	};

});

/**
 * @module backbone.model
 * @submodule html-to-model
 */
define('__model-dock/dom-to-model/attach',['require','exports','module','lodash','./update'],function (require, exports, module) {
	

	var _ = require('lodash');

	var update = require('./update');

	module.exports = function attachDomToModel() {
		// Listen to changes on input elements
		// within the and call an update
		// whenever changes occur.
	//	this.$el.on('change', this.inputSelector, _.bind(update, this));
	};
});

define('__model-dock/events/proxy',['require','exports','module','lodash'],function (require, exports, module) {
	

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

/**
 * @module archetypo
 * @submodule view.dock.attach
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__model-dock/methods',['require','exports','module','lodash','./model-to-dom/attach','./dom-to-model/attach','./events/proxy'],function (require, exports, module) {

	var _ = require('lodash'),
		attachModelDom = require('./model-to-dom/attach'),
		attachDomModel = require('./dom-to-model/attach'),
		proxyEvents = require('./events/proxy');

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

		// proxy events
		proxyEvents.call(this);
	};


	/**
	 *
	 *
	 * @method detach
	 */
	exports.detach = function detach() {

		if (this.model) {
			// Stop listening to all events from the model.
			this.stopListening(this.model);

			// unset this.model
			this.model = void(0);
		}
	};
});

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

define('model-dock',['require','exports','module','lodash','lowercase-backbone','./__model-dock/initialize-attach','./__model-dock/methods'],function (require, exports, module) {
	

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
