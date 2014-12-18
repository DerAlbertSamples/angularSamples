/**
 * Created by aweinert on 18.12.14.
 */
(function(angular) {
    var module = angular.module('sm.directive.input',[]);
    module.directive('smField', function() {
        function link(scope, element, attributes){
            var cols = 12;
            var labelCols = 2;

            if (attributes.labelCols) {
                labelCols = parseInt(attributes.labelCols)
            }
            var inputCols = cols - labelCols;
            if (attributes.inputCols) {
                inputCols = parseInt(attributes.inputCols);
                if (!attributes.labelCols) {
                    labelCols = cols - inputCols;
                }
            }

            var labelClass = "col-sm-" + labelCols;
            var inputClass = "col-sm-" + inputCols;
            var input = element.find('input');
            if (!input.hasClass('form-control'))
                input.addClass('form-control');
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
            scope: {
                caption: '@'
            },
            template:
            '<div class="form-group">'+
            '<label class="control-label">{{caption}}</label>' +
            '<div><ng-transclude></ng-transclude></div>'+
            '</div>'
        }
    });
})(angular)