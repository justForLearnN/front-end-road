requirejs.config({
	urlArgs: 'bust=' + (+new Date),
	baseUrl: 'js/lib',
	paths: {
		dob: 'dob'
	}
});

define(function(require) {
	var dob = require('dob');
})