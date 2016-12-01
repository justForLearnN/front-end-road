angular.module('expanderModule', [])

.value('clientId', 'a2341232433453x')

.factory('clientIDD', function() {
    return 'sccccd242923x';
})

.factory('apiToken', function(clientIDD) {
    var encrypt = function(date1, date2) {
        return (date1 + ':' + date2).toUpperCase();
    }
    var sec = ' + sdfwlinis23';
    return encrypt(clientIDD, sec);
})

.provider('test', function() {
    this.n = 2;
    this.$get = function() {
        return this.n;
    }
})

.factory('Ftest', function($window) {
    var test = {
        fName: 'tank',
        lName: function() {
            return 'zhang'
        }
    }
    $window.alert('aaaaaa');
    return test;
})

.controller('SomeController', function(Ftest) {
    this.test = Ftest;
    console.log(this);

})
