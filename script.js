(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/:premName', {
                        templateUrl: 'premium.htm',
                        controller: 'PremCtrl',
                        controllerAs: 'prem'
                    })
                    .when('/:premName/:subName', {
                        templateUrl: 'premium.htm',
                        controller: 'PremCtrl',
                        controllerAs: 'prem'
                    });

                $locationProvider.html5Mode(false);
            }
        ])
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
            function($scope, $route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                $scope.data = data;
            }
        ])
        .controller('PremCtrl', ['$routeParams', function($routeParams) {
            this.name = "PremCtrl";
            this.params = $routeParams;
        }])
        .filter('getById', function() {
            return function(input, obj) {
                var match = null;
                angular.forEach(obj, function(value, key) {
                    if (value.id === input) {
                        match = value.name;
                    }
                });
                return match;
            }
        })
        .filter('spcToHyphen', function() {
        return function(input) {
            if (input) {
                return input.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace("/", '-');
            }
        }
    });
})(window.angular);
