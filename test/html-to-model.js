define(['model-dock', 'should', 'backbone', 'text!/test/templates/fruit.html'],
function(modelDock  ,  should , Backbone, fruitTemplate) {

	'use strict';

	describe('modelDock html-to-model', function () {

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

		it('values on the model are modified if the html is changed', function () {

			// instantiate the model for the fruit.
			var fruitModel = new Backbone.Model({
				name: 'Banana',
				colors: ['yellow', 'green']
			});

			// instantiate the fruit view
			var fdock = this.fruitDock({ $el: this.$fruit });

			fdock.attach(fruitModel);


			// emulate input modifications
			var $fruit = this.$fruit,
				$fname = $fruit.find('input[name="name"]');

			$fname
				.val('Not Banana Anymore!')
				.trigger('change');

			fruitModel.get('name').should.eql('Not Banana Anymore!');

		});
	});
});
