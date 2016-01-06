(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$filter',
            function($scope, $route, $routeParams, $location, $filter) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                $scope.data = data;
                $scope.versus = versus;
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
                    if ($location.path() == '') {
                        $location.path('/hbo/overview');
                    }
                }
                this.init();
            }
        ])
})(window.angular);
