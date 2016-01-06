(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .controller('PremCtrl', ['$routeParams', '$location', '$scope', '$filter',
            function($routeParams, $location, $scope, $filter) {
                this.name = "PremCtrl";
                this.params = $routeParams;
                var premNameFiltered = $filter('getIdByURL')($routeParams.premName, $scope.data.premiums);
                var subNameFiltered = $filter('getIdByURL')($routeParams.subName, $scope.data.subtabs);
                this.init = function() {
                    if (($routeParams.premName !== undefined) && ($routeParams.subName === undefined)) {
                        $location.path($routeParams.premName + '/overview');
                    }
                    if (!checkSubs($scope.data, premNameFiltered, subNameFiltered)) {
                        $location.path($routeParams.premName + '/overview');
                    }
                    console.log(checkSubs($scope.data, premNameFiltered, subNameFiltered));
                }
                this.init();
            }
        ])
})(window.angular);
