(function(angular) {
    'use strict';
    angular.module('entertainment')
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/calendar', {
                        templateUrl: 'views/calendar.htm',
                        controller: 'CalCtrl',
                        controllerAs: 'cal',
                    })
                    .when('/:premName', {
                        templateUrl: 'views/premium.htm',
                        controller: 'PremCtrl',
                        controllerAs: 'prem'
                    })
                    .when('/:premName/:subName', {
                        templateUrl: 'views/premium.htm',
                        controller: 'PremCtrl',
                        controllerAs: 'prem'
                    });

                $locationProvider.html5Mode(false);
            }
        ])
})(window.angular);
