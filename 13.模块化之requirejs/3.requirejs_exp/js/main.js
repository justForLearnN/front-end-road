requirejs.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	baseUrl: 'js/lib',
	paths: {
		module1: '1.module',
		module2: '../../2.module',
		calculate: '3.calculate',
		result: '4.result',
		jquery: 'jquery-2.0.3',
		slider: 'slider',
		createClass: 'createClass'
	}
});

define(function(require) {
	var 
		mod1 = require('module1');
		$    = require('jquery');

	var n1 = mod1('jake');
	// n1.init();
	console.log(n1);
	console.log($('#our'));
	console.log(n1 instanceof mod1);
});