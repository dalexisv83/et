(function(angular) {
    'use strict';
    angular.module('entertainment')
        .config(['$routeProvider', '$locationProvider', '$httpProvider',
            function($routeProvider, $locationProvider, $httpProvider) {
                // Disable IE ajax request caching
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }

                $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
                $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

                // Routing logic for calendar and premium views
                // /:premName/:subName are variables, can be anything (hbo/overview or mtv/news) set by url
                $routeProvider
                    .when('/entertainment', {
                        redirectTo: '/entertainment/hbo/overview'
                    })
                    .when('/sports', {
                        redirectTo: '/sports/nfl-sunday-ticket-max/overview'
                    })
                    .when('/:tool/:premName', {
                        templateUrl: 'views/main.htm?@@BUSTER@@',
                        controller: 'MainCtrl',
                        controllerAs: 'prem',
                        resolve: {
                            contentData: ['$route', 'ContentPromise', function($route, ContentPromise) {
                                return new ContentPromise($route.current.params.tool);
                            }
                        ]}
                    })
                    .when('/:tool/:premName/:subName', {
                        templateUrl: 'views/main.htm?@@BUSTER@@',
                        controller: 'MainCtrl',
                        controllerAs: 'prem',
                        resolve: {
                            contentData: ['$route', 'ContentPromise', function($route, ContentPromise) {
                                return new ContentPromise($route.current.params.tool);
                            }
                        ]}
                    })
                    .otherwise({
                        redirectTo: '/choose',
                        templateUrl: 'views/choose.htm',
                        controller: 'ChooseCtrl',
                        controllerAs: 'choose'
                    });

                // Important for IE to modern browser url compatibilty
                $locationProvider.html5Mode(false);
            }
        ]);
}(window.angular));