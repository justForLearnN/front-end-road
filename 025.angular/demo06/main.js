angular.module('expanderModule',[])
.directive('accordion', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div ng-transclude></div>',

        //可以对外暴露
        controller : function() {
            console.log(this);
            var expanders = [];
            this.gotOpened = function(selectedExpander) {
                angular.forEach(expanders, function(expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            }
            this.addExpander = function(expander) {
                expanders.push(expander);
            }
        }
    }
})
.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        require : '^?accordion',
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
                   + '<div class="title" ng-click="toggle()">{{title}}</div>'
                   + '<div class="body" ng-show="showMe" ng-transclude></div>'
                   + '</div>',

        // 配合require, 可以与外部通信
        link : function(scope, element, attrs, accordionController) {

            console.log(accordionController);
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
})
.controller("SomeController",function($scope) {
    $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'test'
    }];
    $scope.sss = function() {}
});
