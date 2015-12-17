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

                $scope.init = function() {
                    if ($location.path() == '') {
                        $location.path('/hbo/overview');
                    }
                }

                $scope.init();
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
        .filter('getIdByURL', function() {
            return function(input, obj) {
                var match = null;
                angular.forEach(obj, function(value, key) {
                    if (value.url === input) {
                        match = value.id;
                    }
                });
                return match;
            }
        })
        .filter('getByName', function() {
            return function(name, obj) {
                var match = null;
                angular.forEach(obj, function(value, key) {
                    var normal = value.name.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace("/", '-');
                    if (normal == name) {
                        match = value.id;
                    }
                });
                return match;
            }
        })
        .directive("checker", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                element.bind('click', function(e) {
                    jQuery('.checked').removeClass();
                    element.next().next().toggleClass("checked");
                    //element.leClass("checked");
                    angular.element(document.body).addClass('ieFix').removeClass('ieFix');
                });
            };
        })
        .filter('spcToHyphen', function() {
            return function(input) {
                if (input) {
                    return input.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace("/", '-');
                }
            }
        });
})(window.angular);
