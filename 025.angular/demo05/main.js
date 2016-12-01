angular.module('expanderModule', [])
.directive('expander', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title : '=expanderTitle'
        },
        template: '<div>' +
                       '<div class="title" ng-click="toggle()">{{title}}</div>' +
                       '<div class="body" ng-show="showMe" ng-transclude></div>' +
                   '</div>',
        link: function(scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            }
        }
    }
})
.controller('SomeController',function($scope) {
    $scope.title = 'click to open';
    $scope.text = 'this is inner contain';
});
