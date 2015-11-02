define(function() {
	var allStudents = [];
	return {
		classID: '001',
		department: 'computer',
		addToClass: function(student) {
			allStudents.push(student);
		},
		getClassSize: function() {
			return allStudents.length;
		}, 
		getName: function(index) {
			return allStudents[index].name;
		}
	};
});