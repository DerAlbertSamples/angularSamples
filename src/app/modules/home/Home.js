/**
 * Created by aweinert on 17.12.14.
 */
(function (angular) {
    var module = angular.module('sm.home', ['sm.directives'])

    function HomeController() {
        this.text = 'Foobar';
    }

    HomeController.$inject = [];

    module.controller('HomeController', HomeController);
})(angular);

