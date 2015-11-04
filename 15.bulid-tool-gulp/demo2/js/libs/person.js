define(function(require) {
	return require('createClass')(function(name) {
		this.name = name;
	}, {
		getName: function() {
			return this.name;
		},
		getGender: function() {
			return 'man';
		}
	});
});