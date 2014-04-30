define(['model-dock', 'should', 'backbone', 'text!/test/templates/fruit.html'],
function(modelDock  , should, Backbone, fruitTemplate) {

	'use strict';

	describe('proxy', function () {

		beforeEach(function () {

			// jquery elements
			var $fixture =
				$('<div id="fixture"></div>')
					.appendTo($('html'))
					.append(fruitTemplate);

			this.$fixture = $fixture;
			this.$fruit = $fixture.find('#fruit');

			// Backbone cosntructors
			this.fruitDock = modelDock.extend({
				map: {
					'name': ['input[name="name"]', '.name', '.name -> attr:href'],
					'colors': 'input[name="colors"]'
				}
			});

		});

		afterEach(function () {
			this.$fixture.remove();
		});

		it('proxies events from the model', function () {

			var melancia = new Backbone.Model({
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var fdock = this.fruitDock({
				el: this.$fruit,
				model: melancia
			});


			// control variable
			var control = false;

			// listen to proxied event
			// (change:colors is triggered on the model, and proxied to the dock-view)
			fdock.on('change:colors', function (model) {
				control = model.get('colors');
			});

			// change colors of melancia
			melancia.set('colors', ['gray', 'brown']);
			control.should.eql(['gray', 'brown']);

			// detach melancia
			fdock.attach(banana);
			// change colors on melancia
			melancia.set('colors', ['red', 'blue']);
			// control should remain unchanged
			control.should.eql(['gray', 'brown']);
			// change colors on banana
			banana.set('colors', ['green', 'pink']);
			// control should have changed
			control.should.eql(['green', 'pink']);
		});
	});
});
