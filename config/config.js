(function(angular) {
    'use strict';
    angular.module('entertainment')
        .config(['$routeProvider', '$locationProvider', '$httpProvider',
            function($routeProvider, $locationProvider, $httpProvider) {

                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }
                //disable IE ajax request caching
                $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

                $routeProvider
                    .when('/calendar', {
                        templateUrl: 'views/calendar.htm',
                        controller: 'CalCtrl',
                        controllerAs: 'cal',
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
                $locationProvider.html5Mode(false);
            }
        ])
})(window.angular);
