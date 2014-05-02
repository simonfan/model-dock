define(['mocha'], function (mocha) {
	// use mocha with bdd
	mocha.setup('bdd');

	require(['../test/events', '../test/methods', '../test/properties'], function () {


		// run mocha
		mocha.checkLeaks();
		mocha.run();

	});
});
