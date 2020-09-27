'use strict';

angular.
module('dashBoard').
component('dashBoard', {
    templateUrl: 'dash-board/dash-board.template.html',
    controller: ['$http', '$routeParams', '$scope', function dashBoardController($http, $routeParams, $scope) {
        var self = this;
        self.startnum = self.startnumU = 0;
        self.orderProp = self.orderPropU = 'Id';
        self.orderPropA = self.orderPropUA = 'Id';

        if ($routeParams.pid) {
            self.view = "form";
        } else {
            self.view = "board";
        }
        self.data = $routeParams.data;

        $http.get('data/data.json').then(function(response) {
            self.datablocks = self.dataarray = response.data;
        });
    }]
});



angular.module('orderByColumn', ['ngMaterial', 'ngMessages'])
    .controller('OrderController', ['$scope', '$timeout', '$location', '$filter', function($scope, $timeout, $location, $filter) {

        $scope.$location = $location;
        $scope.requestdata = {};
        //$scope.editrequest = {};
        $scope.backseat = {};
        $scope.project = {
            description: 'CS test',
            rate: 500,
            special: true
        };
        // unique funcs
        $scope.truncString = function(stringA, maxL) {
            $scope.truncated = false;
            stringA = (stringA.length > maxL) ? stringA.substring(0, maxL) + '...' : stringA;
            $scope.truncated = (stringA.length > maxL) ? true : false;
            return stringA;
        };
        $scope.pagequant = function(arradates) {
            var pageNumU = Math.ceil(arradates.length / $scope.perpage);
            return pageNumU;
        };
        $scope.checkpagemy = function(incom, startnum) {
            $scope.maxpageU = incom;
            $rootScope.reqdata = 'dash';
            $scope.curpageU = ((startnum + $scope.perpage) / $scope.perpage);
            if (incom < ((startnum + $scope.perpage) / $scope.perpage)) {
                return true;
            } else {
                return false;
            }
        };
        $scope.$watch('editrequest', function(newValue, oldValue) {
            console.log(newValue + ":" + oldValue)
            $scope.CopyDisplayName = newValue;
        });
        $scope.copyValue = function() {
            $scope.editrequest = angular.copy($scope.backseat);
        };
        $scope.pushdata = function(userdata, masterdata) {
            masterdata.push(userdata);
            $scope.$ctrl.view = 'board';
        };

        // form function
        $scope.setfoo = function(pid) {
            $scope.$ctrl.pid = pid;
            $scope.$ctrl.mode = pid.substr(0, 1);
            $scope.$ctrl.id = parseInt(pid.substr(1));
            $scope.$ctrl.view = 'form';
        };
        $scope.setnew = function(pid) {
            $scope.$ctrl.mode = pid;
            $scope.$ctrl.view = 'form';
        };
        $scope.formatDate = function(date) {

            return $filter('date')(date, "dd-MMM-yy");
        };
        $scope.updateU = function(editrequest) {
            //angular.copy(editrequest, $scope.backseat);
            $scope.$ctrl.view = 'board';
        };
        $scope.update = function(editrequest) {
            // $scope.backseat = angular.copy(editrequest);
            $scope.$ctrl.view = 'board';
        };
        $scope.returntodash = function() {
            $scope.$ctrl.view = 'board';
        };


        var goback = {};

        $scope.parseit = function(myarray, ids) {
            let max = 1;
            for (let i = 1; i < myarray.length; ++i) {
                if (myarray[i].Id > max) {
                    max = myarray[i].Id;
                }
            }
            $scope.maxid = max;
            $scope.nextid = ++max;
            //$scope.emptyarr = { "DisplayName": "", "Name": "", "Surname": "", "Department": "", "Email": "", "Id": ++max, "Manager": false, "Roles": [] };
            goback = myarray.find(x => x.Id == ids);
            goback.Deadline = $scope.formatDate(goback.Deadline);
            $scope.requestdata = goback;
            angular.copy($scope.requestdata, $scope.backseat);
            return (goback) ? goback : emptyarr;
        };

        $scope.statuses = ('Draft New Finished Other').split(' ').map(function(status) {
            return { arra: status };
        });

        $scope.reset = function() {
            $scope.editrequest = angular.copy($scope.backseat);
            $scope.$ctrl.view = 'form';
        };
        $scope.resetU = function() {
            angular.copy($scope.backseat, $scope.userdata);
            $scope.$ctrl.view = 'form';
        };
        $scope.initdata = function() {
            if (!$scope.orderPropA) $scope.orderPropA = 'Id';
            if (!$scope.startnum) $scope.startnum = 0;
            if (!$scope.orderPropUA) $scope.orderPropUA = 'Id';
            if (!$scope.startnumU) $scope.startnumU = 0;
            $scope.startnuminit = 0;
            $scope.perpage = 10;
        };

        // divided
        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.orderPropA = ($scope.reverse) ? propertyName : '-' + propertyName;
            $scope.propertyName = propertyName;
            return $scope.orderProp;
        };
        $scope.sortByU = function(propertyName) {
            $scope.reverseU = ($scope.propertyNameU === propertyName) ? !$scope.reverseU : false;
            $scope.orderPropUA = ($scope.reverseU) ? propertyName : '-' + propertyName;
            $scope.propertyNameU = propertyName;
            return $scope.orderProp;
        };
        $scope.filterU = function() {
            $timeout(function() {
                $scope.startnumU = 0;
            }, 10);
        };
        $scope.filter = function() {
            $timeout(function() {
                $scope.startnum = 0;
            }, 10);
        };


        $scope.prevpage = function(startnum, tabl) {
            if (tabl == 1) {
                $scope.startnum = startnum - $scope.perpage;
            } else {
                $scope.startnumU = startnum - $scope.perpage;
            }
            return startnum;
        };
        $scope.nextpage = function(startnum, tabl) {
            if (tabl == 1) {
                if (!$scope.startnum) startnum = $scope.startnuminit;
                $scope.startnum = startnum + $scope.perpage;
            } else {
                if (!$scope.startnumU) startnum = $scope.startnuminit;
                $scope.startnumU = startnum + $scope.perpage;
            }
            return startnum;
        };

    }])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
        // Configure a  theme 
        $mdThemingProvider.theme('docs-light', 'default')
            .primaryPalette('grey')
            .accentPalette('grey')
            .warnPalette('grey')
            .backgroundPalette('grey');


    }]);