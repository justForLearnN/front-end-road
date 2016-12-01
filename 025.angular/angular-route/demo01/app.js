angular.module('app', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/post', {
            templateUrl: 'post.html'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .otherwise({
            redirectTo: '/'
        })
})
