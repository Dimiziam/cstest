'use strict';

// Define the `dashBoardApp` module
angular.module('dashBoardApp', [
    // ...which depends on the `dashBoard` module
    'ngRoute',
    'dashBoard',
    'formData',
    'orderByColumn'
]);