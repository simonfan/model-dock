define(['mocha'], function (mocha) {
	// use mocha with bdd
	mocha.setup('bdd');

	require(['../test/html-to-model', '../test/model-to-html'], function () {


		// run mocha
		mocha.checkLeaks();
		mocha.run();

	});
});
