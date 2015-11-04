define(function(require) {
	var mod1 = require('mod1');
	return {
		show: function(a, b) {
			if (mod1) {
				return (a > b) ? mod1.del(a, b) : mod1.add(a, b);
			};
		}
	}
});