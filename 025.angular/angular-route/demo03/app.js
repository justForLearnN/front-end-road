angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/post', {
            templateUrl: 'post.html',
            controller: 'postController',
            resolve: {
                'ticket': function($q, $timeout) {
                    var defer = $q.defer();
                    $timeout(function() {
                        defer.resolve('this is post page.');
                    }, 3000);
                    return defer.promise;
                }
            }
        })
        .otherwise('/');
})
.controller('homeController', function($scope) {
    $scope.msg = "this is home page."
})

.controller('postController', function($scope, ticket) {
    console.log(ticket);
    $scope.msg = ticket;
})

.run(function($rootScope) {
    $rootScope.$on('$routeChangeStart', function(ev, next) {
        console.log('route change start.');
        console.log(ev, next);
    })
    $rootScope.$on('$routeChangeSuccess', function(ev, cur) {
        console.log('route switch success!');
        console.log(ev, cur);
    })
})
