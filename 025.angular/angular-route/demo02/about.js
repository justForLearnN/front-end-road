angular.module('Module.About', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: 'about.html',
        controller: 'aboutController'
    })
})
.controller('aboutController', function($scope) {
    $scope.msg = "this is about page."
})
