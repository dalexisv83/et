(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/calendar', {
                        templateUrl: 'calendar.htm',
                        controller: 'CalCtrl',
                        controllerAs: 'cal',
                    })
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
})(window.angular);
