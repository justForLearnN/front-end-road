define(['calculate'], function(cal) {
	return {
		show: function(num1, num2) {
			if (num1 > num2) {
				if (cal) {
					return cal.del(num1, num2);
				}else return 'require fail';
			} else {
				return console.log('can not del them');
			}
		},
		shal: function(num1, num2) {
			if (num1 < num2) {
				return cal.add(num1, num2);
			} else {
				return 'can not add them';
			}
		}
	}
})