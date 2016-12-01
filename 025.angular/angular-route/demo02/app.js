angular.module('app', [
    'ngRoute',
    'Module.Home',
    'Module.Post',
    'Module.About'
])
.config(function($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        })
})
.controller('demoController', function($scope) {
})

// Module.Home
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

// Module.Post
angular.module('Module.Post', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/post', {
            templateUrl: 'post.html',
            controller: 'postController'
        })
})
.controller('postController', function($scope) {
    $scope.msg = "this is post page."
})

// Module.About
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
