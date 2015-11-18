define(function(require, exports, module) {
	return require('createClass')(function(name){
		this.name = name;
		this.init();
	}, {
		init: function() {
			console.log('xxxxxx:' + this.name);
		},
		getName: function() {
			return "my name is " + this.name;
		}
	});
});