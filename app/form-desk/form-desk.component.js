'use strict';

// Register `formDesk` component, along with its associated controller and template
angular.
module('formDesk').
component('formDesk', {
    //template: 'TBD: Detail view for <span>PID:{{$ctrl.pid}} Mode:{{$ctrl.mode}} ID:{{$ctrl.id}}</span>',
    //controller: ['$routeParams',
    //    function OrderController($routeParams) {
    templateUrl: 'form-desk/form-desk.template.html',
    controller: ['$http', '$routeParams',
        function OrderController($http, $routeParams) {
            var self = this;
            self.pid = $routeParams.pid;
            self.mode = self.pid.substr(0, 1);
            self.id = parseInt(self.pid.substr(1));
            $http.get('data/data.json').then(function(response) {
                self.dataarray = response.data;
            });
        }
    ]
});



angular
    .module('formData', ['ngMaterial', 'ngMessages'])
    .controller('FormController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope, $http, $window, userService) {
        $scope.login = function() {
            $http({
                method: 'POST',
                url: '/login',
                data: $scope.user
            }).success(function(data) {
                userService.setEmail("foobar");
                $window.location.href = '/app'
            }).error(function(data) {
                $scope.login.error = true;
                $scope.error = data;
            });
        };
        var goback = {};
        $scope.submit = submit;

        $scope.$on('parent', function(event, data) {
            console.log(data); // 'Some data'
        });
        $rootScope.$emit('rootScope:emit', 'Emit!'); // $rootScope.$on
        $rootScope.$broadcast('rootScope:broadcast', 'Broadcast'); // $rootScope.$on && $scope.$on

        var submit = function() {
            /* while compiling form , angular created this object*/
            var data = $scope.reqdata;
            /* post to server*/
            $http.post('/form/u123  ', data);
        }
        $scope.storedata = function(obj) {
            // obj is json
            $post('/form/u123', obj);
        };

        $scope.send = function(event, i) {
            event.preventDefault();
            // do something with 'i'
            $rootScope.reqdata = "aaa";
            $location.path('/');
            //$state.go('tab.form');

        }
        $scope.parseit = function(myarray, id) {
            goback = myarray.find(x => x.Id === id);
            return (goback) ? goback : false;;
        };
        $scope.user = {
            title: 'Developer',
            email: 'ipsum@lorem.com',
            firstName: '',
            lastName: '',
            company: 'Google',
            address: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
            postalCode: '94043'
        };

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function(state) {
            return { abbrev: state };
        });
    }])
    .config(function($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-light', 'default')
            .primaryPalette('grey')
            .accentPalette('grey')
            .warnPalette('grey')
            .backgroundPalette('grey');

    });