'use strict';

// Register `formDesk` component, along with its associated controller and template
angular.
module('formDesk').
component('formDesk', {
    template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$routeParams',
        function PhoneDetailController($routeParams) {
            this.phoneId = $routeParams.phoneId;
        }
    ]
});