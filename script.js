(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/calendars', {
                        templateUrl: 'calendar.htm',
                        controller: 'CalCtrl',
                        controllerAs: 'cal',
                        //reloadOnSearch: false
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
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
            function($scope, $route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                $scope.data = data;
                $scope.genres = getGenres($scope.data.calendars);

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
        .controller('CalCtrl', ['$scope', '$routeParams', '$location', '$filter',
            function($scope, $routeParams, $location, $filter) {
                this.name = "CalCtrl";
                this.params = $routeParams;
                $scope.$watch(function() {
                    return $location.search()
                }, function(params) {
                    $scope.genSel = params.genre;
                    var filteredModel = $filter('getByName')(params.premium, $scope.data.premiums);
                    $scope.premSel = filteredModel;
                });
                $scope.$watch('genSel', function() {
                    $location.search('genre', $scope.genSel);
                });
                $scope.$watch('premSel', function() {
                    var filteredModel = $filter('getById')($scope.premSel, $scope.data.premiums);
                    $location.search('premium', filteredModel);
                });
                $scope.aParam = function(param, value, filter, filterparam) {
                    if (filter) {
                        value = $filter(filter)(value, filterparam);
                    }
                    $location.search(param, value);
                }
            }
        ])
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
        })
        .filter('unique', function() {

            return function(items, filterOn) {

                if (filterOn === false) {
                    return items;
                }

                if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                    var hashCheck = {},
                        newItems = [];

                    var extractValueToCompare = function(item) {
                        if (angular.isObject(item) && angular.isString(filterOn)) {
                            return item[filterOn];
                        } else {
                            return item;
                        }
                    };

                    angular.forEach(items, function(item) {
                        var valueToCheck, isDuplicate = false;

                        for (var i = 0; i < newItems.length; i++) {
                            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                                isDuplicate = true;
                                break;
                            }
                        }
                        if (!isDuplicate) {
                            newItems.push(item);
                        }

                    });
                    items = newItems;
                }
                return items;
            };
        })
    .filter('dateRange', function() {
        return function(items, startDate, endDate) {
            if (!endDate) {
                if (!startDate) {
                    return items;
                }
                var matches = [];
                angular.forEach(items, function(value, key) {
                    var itemDate = Date.parse(value.premDate);
                    var s = Date.parse(startDate);
                    if ((itemDate >= s) && (itemDate <= s + 86399999)) {
                        matches.push(value);
                    }
                });
                return matches;
            }
            var matches = [];
            angular.forEach(items, function(value, key) {
                var itemDate = Date.parse(value.premDate);
                var s = Date.parse(startDate);
                var e = Date.parse(endDate) + 86399999;
                if (itemDate >= s && itemDate <= e) {
                    matches.push(value);
                }
            });
            return matches;
        }
    });
})(window.angular);

var getGenres = function(source) {
    var genres = [];
    for (var i in source) {
        for (var n in source[i].genres) {
            genres.push(source[i].genres[n]);
        }
    }
    return genres;
}
