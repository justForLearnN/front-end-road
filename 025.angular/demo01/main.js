var app = angular.module('demo', []);
app.controller('HelloCtrl', function($scope) {
    $scope.name = "hello";
    $scope.getName = function() {
        return $scope.name;
    }

    $scope.population = 7000;
    $scope.countries = [
        { name: 'France', population: 63.1 },
        { name: 'United', population: 61.8 }
    ]

    $scope.worldsPercentage = function(countryPopulation) {
        return countryPopulation/$scope.population * 100;
    }
})
