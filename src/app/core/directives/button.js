(function (angular) {
    var module = angular.module('sm.directive.button', []);

    function addLevelAndSize(cssClass, element, attributes) {
        if (element.hasClass(cssClass)) {
            if (attributes.size) {
                element.addClass(cssClass + "-" + attributes.size);

            }
            if (attributes.level) {
                element.addClass(cssClass + "-" + attributes.level);
            }
        }

    };

    module.directive('button', function () {
        return {
            restrict: 'E',
            compile: function (element, attributes) {
                element.addClass('btn');
                if (attributes.type === 'submit') {
                    element.addClass('btn-primary');
                }
                addLevelAndSize('btn', element, attributes);
            }
        };
    });


    module.directive('input', function () {
        return {
            restrict: 'E',
            compile: function (element, attributes) {
                if (attributes.type === 'button' || attributes.type === 'submit') {
                    element.addClass('btn');
                }
                if (attributes.type === 'submit') {
                    element.addClass('btn-primary');
                }
                addLevelAndSize('btn', element, attributes);
            }
        };
    });

    module.directive('smButton', function () {
        return {
            restrict: 'A',
            compile: function (element, attributes) {
                element.addClass('btn');
                addLevelAndSize('btn', element, attributes);
            }
        };
    });
})(angular);