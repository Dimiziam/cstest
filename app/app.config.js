'use strict';

angular.
module('dashBoardApp').
config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
        when('/', {
            template: '<dash-board></dash-board>'
        }).
        when('/form', {
            template: '<form-desk></form-desk>'
        }).
        otherwise('/');
    }
]);