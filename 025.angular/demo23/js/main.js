
var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config( function($routeProvider, $locationProvider) {

	// $routeProvider.when('/home', {
	// 	templateUrl: 'pages/home.html',
	// 	controller: 'mainController'
	// })
	.when('./', {
		templateUrl: 'pages/home.html',
		controller: 'mainController'
	})
	.when('./about', {
		templateUrl: 'pages/about.html',
		controller: 'aboutController'
	})
	.when('./contact', {
		templateUrl: 'pages/contact.html',
		controller: 'contactController'
	})
} );

scotchApp.controller('mainController', ['$scope', function($scope) {
	$scope.message = "Every one will come and see how good I look."
}]);

scotchApp.controller('aboutController', ['$scope', function($scope) {
	$scope.message = "Hello, I am a about page!";
}]);

scotchApp.controller('contactController', ['$scope', function($scope) {
	$scope.message = "google is a perfe. call me contact.";
}])