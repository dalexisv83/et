(function(angular) {
    'use strict';
    angular.module('entertainment')
        .config(['$routeProvider', '$locationProvider', '$httpProvider',
            function($routeProvider, $locationProvider, $httpProvider) {
                // Disable IE ajax request caching
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }

                $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

                // Routing logic for calendar and premium views
                // /:premName/:subName are variables, can be anything (hbo/overview or mtv/news) set by url
                $routeProvider
                    .when('/calendar', {
                        templateUrl: 'views/calendar.htm',
                        controller: 'CalCtrl',
                        controllerAs: 'cal'
                    })
                    .when('/:premName', {
                        templateUrl: 'views/premium.htm',
                        controller: 'MainCtrl',
                        controllerAs: 'prem'
                    })
                    .when('/:premName/:subName', {
                        templateUrl: 'views/premium.htm',
                        controller: 'MainCtrl',
                        controllerAs: 'prem'
                    })
                    .otherwise({redirectTo:'/hbo/overview'});

                // Important for IE to modern browser url compatibilty
                $locationProvider.html5Mode(false);
            }
        ]);
}(window.angular));