/**
 * Created by aweinert on 17.12.14.
 */
(function (angular) {
    var module = angular.module('sm.home', ['sm.directives'])

    function HomeController($scope) {
        this.text = 'Ein Input';
        this.data = {
            text: 'Zwei Input'
        }
        $scope.data = this.data;
    }

    HomeController.$inject = ['$scope'];

    module.controller('HomeController', HomeController);
})(angular);

