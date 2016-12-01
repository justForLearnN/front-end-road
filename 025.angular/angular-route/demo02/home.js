angular.module('Module.Home', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'homeController'
    })
})
.controller('homeController', function($scope) {
    $scope.msg = 'This is home page.'
})
