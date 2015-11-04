(function(window) {

	var jPerson = function(name, age) {
		return new jPerson.fn.init(name, age);
	}

	jPerson.fn = jPerson.prototype = {

		constructor: jPerson,

		init: function(name, age) {
			this.name = name;
			this.age  = age;
			return this;
		},
		getName: function() {
			return this.name;
		}
	}

	jPerson.fn.init.prototype = jPerson.fn;

	window.jPerson = window.m = jPerson;

	if (typeof define == 'function' && define.amd) {
		define('jperson', [], function() {
			return jPerson;
		})
	};

})(window);