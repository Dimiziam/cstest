'use strict';

// Register `dashBoard` component, along with its associated controller and template
angular.
module('dashBoard').
component('dashBoard', {
    templateUrl: 'dash-board/dash-board.template.html',
    controller: ['$http', function dashBoardController($http) {
        var self = this;
        self.startnum = self.startnumU = 0;
        self.orderProp = self.orderPropU = 'Id';
        self.orderPropA = self.orderPropUA = 'Id';
        self.noOfPages = 1;
        $http.get('data/data.json').then(function(response) {
            self.datablocks = response.data;
        });
    }]
});



angular.module('orderByColumn', [])
    .controller('OrderController', ['$scope', '$timeout', function($scope, $timeout) {
        // unique funcs
        $scope.truncString = function(stringA, maxL) {
            $scope.truncated = false;
            stringA = (stringA.length > maxL) ? stringA.substring(0, maxL) + '...' : stringA;
            $scope.truncated = (stringA.length > maxL) ? true : false;
            return stringA;
        };
        $scope.pagequant = function(arradates) {
            var pageNumU = Math.ceil(arradates.length / $scope.perpage);
            //$scope.pageNumU = pageNumU;
            return pageNumU;
        };
        $scope.checkpagemy = function(incom, startnum) {
            $scope.maxpageU = incom;
            $scope.curpageU = ((startnum + $scope.perpage) / $scope.perpage);
            if (incom < ((startnum + $scope.perpage) / $scope.perpage)) {
                return true;
            } else {
                return false;
            }
        };

        // for both
        $scope.initdata = function() {
            if (!$scope.orderPropA) $scope.orderPropA = 'Id';
            if (!$scope.startnum) $scope.startnum = 0;
            if (!$scope.orderPropUA) $scope.orderPropUA = 'Id';
            if (!$scope.startnumU) $scope.startnumU = 0;
            $scope.startnuminit = 0;
            $scope.perpage = 3;
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

        // obsolte
        $scope.slicedata = function(arradates, iter) {
            var endof = (iter * 5 > arradates.length) ? arradates.length : iter * 5;
            iter--;
            var datafiltered = angular.copy(arradates);
            datafiltered = datafiltered.slice(iter * 5, endof);
            $scope.datafiltered = datafiltered;
            return datafiltered.length;
        };

    }]);