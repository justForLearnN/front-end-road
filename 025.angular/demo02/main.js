var app = angular.module('demo', []);
app.controller('HelloCtrl', function($scope) {
    $scope.thing = {
        name: 'world'
    }
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

app.controller('sub', function($scope) {

})

/*
1. 控制器相当于一个对象，在对象中所有的属性与方法都挂载在$scope上
2. 子作用域可以访问父级作用域中的变量与方法，这一点于js的作用域一样
3. 如果要在子作用域中改变父级作用域绑定的变量，最好的方法是将变量绑定给某对象的属性，该对象存在于父级作用域中
*/
