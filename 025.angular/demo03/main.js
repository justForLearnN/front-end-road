var app = angular.module('demo', []);
var MAX_LEN = 100;
app.controller('TextAreaWithLimitCtrl', function($scope) {
    $scope.message = 'xx';
    $scope.remaining = function() {
        return MAX_LEN - $scope.message.length;
    }
    $scope.shouldWarn = function() {
        return $scope.remaining() < 70;
    }
})
