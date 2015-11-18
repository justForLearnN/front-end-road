requirejs.config({
	urlArgs: "dust=" + (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		jquery: 'libs/jquery',
		createClass: 'libs/createClass/src/createClass',
		person: 'libs/person'
	}
});

define(function(require) {
	var person = require('person');
	console.log(person('yangbo').getName());
});