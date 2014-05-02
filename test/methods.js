define(['model-dock', 'should', 'backbone'],
function(modelDock  , should, Backbone) {

	'use strict';

	describe('method invocation', function () {

		it('backbone model object methods should be invocable through dock methods', function () {

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
				dock.get('colors').should.eql(melancia.get('colors'));
				dock.set('name', 'Watermelon');
				melancia.get('name').should.eql('Watermelon');

			dock.attach(banana);
				dock.get('colors').should.eql(banana.get('colors'));
				dock.set('name', 'yellow fruit');
				melancia.get('name').should.eql('Watermelon');
				banana.get('name').should.eql('yellow fruit');
		});
	});
});
