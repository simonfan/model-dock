define(['model-dock', 'should', 'backbone'],
function(modelDock  , should, Backbone) {

	'use strict';

	describe('property retrieval', function () {

		it('backbone model object properties may be retrieved through dock methods', function () {

			var melancia = new Backbone.Model({
					id: 1,
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					id: 5,
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var dock = modelDock();

			dock.attach(melancia);
				dock.id().should.eql(melancia.id);
				dock.cid().should.eql(melancia.cid);

			dock.attach(banana);
				dock.id().should.eql(banana.id);
				dock.cid().should.eql(banana.cid);
		});
	});
});
