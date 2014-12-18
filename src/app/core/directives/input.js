/**
 * Created by aweinert on 18.12.14.
 */
(function(angular) {
    var module = angular.module('sm.directive.input',[]);

    module.directive('smForm', function() {
        function controller($scope) {
            this.colsLeft = $scope.colsLeft || 2;
            this.colsRight = $scope.colsRight || 12-this.colsLeft;
            this.horizontal = angular.isDefined($scope.horizontal) && $scope.horizontal=="true" ? true : false;
        }
        function link(scope, element, attrs, ctrl) {
            console.log(ctrl);
            if (ctrl.horizontal) {
                element.addClass('form-horizontal');
           }
        }
        controller.$inject=['$scope'];
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            link: link,
            controller: controller,
            controllerAs: 'ctrl',
            scope: {
                colsLeft: '@',
                colsRight: '@',
                horizontal: '@'
            },
            template:
            '<form class="form">'+
            '<ng-transclude></ng-transclude>'+
            '</form>'
        }
    });
    module.directive('smField', function() {
        function link(scope, element, attributes, ctrl){
            console.log(ctrl);

            var cols = 12;
            var labelCols = 2;
            if (ctrl && ctrl.colsLeft) {
                labelCols = ctrl.colsLeft;
            }
            if (attributes.labelCols) {
                labelCols = parseInt(attributes.labelCols)
            }
            var inputCols = cols - labelCols;
            if (ctrl && ctrl.colsRight) {
                inputCols = ctrl.colsRight;
            }

            if (attributes.inputCols) {
                inputCols = parseInt(attributes.inputCols);
            }
            inputCols = Math.min(inputCols, cols-labelCols);
            var labelClass = "col-sm-" + labelCols;
            var inputClass = "col-sm-" + inputCols;
            var input = element.find('input');
            if (!input.hasClass('form-control'))
                input.addClass('form-control');

            if (ctrl && !ctrl.horizontal)
                return;
            if (!input.hasClass(inputClass))
                input.parent().addClass(inputClass);
            var label = element.find('label');
            if (!label.hasClass(labelClass))
                label.addClass(labelClass)
        }
        return {
            link: link,
            restrict: 'E',
            replace: true,
            transclude: true,
            require : '^smForm',
            scope: {
                caption: '@'
            },
            template:
            '<div class="form-group">'+
            '<label class="control-label">{{caption}}</label>' +
            '<div ng-transclude></div>'+
            '</div>'
        }
    });
})(angular)