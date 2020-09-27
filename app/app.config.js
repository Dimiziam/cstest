'use strict';

var app = angular.module('SetTrackerApp', ['$strap.directives', 'ngCookies']);

angular.
module('dashBoardApp').
config(['$routeProvider',
        function config($routeProvider) {
            $routeProvider.
            when('/', {
                template: '<dash-board></dash-board>'
            }).
            when('/form/:pid', {
                template: '<dash-board></dash-board>'
            }).
            otherwise('/');
        }
    ])
    .factory('userService', function() {
        var userData = [
            { yearSetCount: 0 }
        ];

        return {
            user: function() {
                return userData;
            },
            setEmail: function(email) {
                userData.email = email;
            },
            getEmail: function() {
                return userData.email;
            },
            setSetCount: function(setCount) {
                userData.yearSetCount = setCount;
            },
            getSetCount: function() {
                return userData.yearSetCount;
            }
        };
    });