(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'model-dock',
		// dependencies for the test
		deps = [mod, 'should', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(modelDock, should, Backbone) {
	'use strict';

	describe('modelDock attribute-proxies', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {


			var mdock = modelDock({ model: new Backbone.Model({
				id: 1,
				name: 'first-model'
			})});


			mdock.id.should.eql(1);

			mdock.attributes.name.should.eql('first-model');

		});
	});
});
