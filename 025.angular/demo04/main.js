var url = 'https://hq-dev.tigerbrokers.com/fundamental/finance_calendar/getType/2016-06-05/2016-06-25';


var app = angular.module('app', []);
app.controller('TextAreaWithLimitCtrl', function($scope, $http, $q) {
    $scope.msg = "Hello, <b>world!</b>";
    $http.get(url)
    .success(function(res, status, headers, config) {
        console.log(res);
    })
    .error(function(res, status, headers, config) {
        console.log('timeout');
    })
})
