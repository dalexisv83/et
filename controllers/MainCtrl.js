(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$filter', '$templateCache',
            function($scope, $route, $routeParams, $location, $filter, $templateCache) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.params = $routeParams;
                $scope.data = data;
                $scope.versus = versus;
                $scope.isStringNumber = stringIsNumber;
                $scope.selChecks = {
                    "services": {
                        "DIRECTV": true,
                        "Sling TV": true,
                        "Hulu": true,
                        "Netflix": true,
                        "Amazon Prime Video": true
                    }
                };
                $scope.genres = getGenres($scope.data.calendars);
                this.init = function() {
                    var premNameFiltered = $filter('getIdByURL')(this.$routeParams.premName, $scope.data.premiums);
                    var subNameFiltered = $filter('getIdByURL')(this.$routeParams.subName, $scope.data.subtabs);
                    if ((this.$routeParams.premName !== undefined) && (this.$routeParams.subName === undefined)) {
                        $location.path(this.$routeParams.premName + '/overview');
                    }
                    if ((this.$routeParams.premName !== undefined) && (this.$routeParams.subName !== undefined)) {
                        if (!checkSubs($scope.data, premNameFiltered, subNameFiltered)) {
                            $location.path(this.$routeParams.premName + '/overview');
                        }
                    }
                }
                this.init();
            }
        ])
})(window.angular);
