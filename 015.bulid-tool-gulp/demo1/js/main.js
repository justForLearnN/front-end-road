requirejs.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		jquery: 'libs/jquery',
		mod1: 'libs/module1',
		mod2: 'libs/module2',
		mod3: 'libs/module3'
	}
});

define(function(require) {
	var jquery = require('jquery');
	var mod2 = require('mod2');
	var jperson = require('mod3');
	console.log('jquery', $(document).width());
	console.log('result', mod2.show(10, 20));
	console.log('jPerson', m('yangbo').getName());
});