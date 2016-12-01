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
