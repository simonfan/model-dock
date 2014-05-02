define(['model-dock', 'should', 'backbone'],
function(modelDock  , should, Backbone) {

	'use strict';

	describe('proxy', function () {

		it('proxies events from the model', function () {

			var melancia = new Backbone.Model({
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var fdock = modelDock({
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
