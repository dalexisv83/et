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
                    } else if (($routeParams.premName !== undefined) && ($routeParams.subName === undefined)) {
                        $location.path($routeParams.premName + '/overview');
                    }
                }
                $scope.init();
            }
        ])
        .controller('PremCtrl', ['$scope','$routeParams',
            function($scope, $routeParams) {
                this.name = "PremCtrl";
                this.params = $routeParams;
                $scope.init();
            }
        ])
        .controller('CalCtrl', ['$scope', '$routeParams', '$location', '$filter',
            function($scope, $routeParams, $location, $filter) {
                this.name = "CalCtrl";
                this.params = $routeParams;
                $scope.aParam = function(param, value, filter, filterparam) {
                    if (filter) {
                        value = $filter(filter)(value, filterparam);
                    }
                    $location.search(param, value);
                }
                $scope.$watch(function() {
                    return $location.search()
                }, function(params) {
                    $scope.genSel = params.genre;
                    var filteredModel = $filter('getByName')(params.premium, $scope.data.premiums);
                    $scope.premSel = filteredModel;
                    $scope.typeSel = params.type;
                    $scope.chanSel = params.channel;
                });
                $scope.$watch('genSel', function() {
                    $location.search('genre', $scope.genSel);
                });
                $scope.$watch('premSel', function() {
                    var filteredModel = $filter('getById')($scope.premSel, $scope.data.premiums);
                    $location.search('premium', filteredModel);
                });
                $scope.$watch('typeSel', function() {
                    $location.search('type', $scope.typeSel);
                });
                $scope.$watch('chanSel', function() {
                    $location.search('channel', $scope.chanSel);
                });
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
        .directive("datepicker", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                if ((jQuery.fn.datetimepicker) && (!Modernizr.inputtypes.date)) {
                    angular.element(element).on('click focus', function(e) {
                        if ((attrs.min) && (scope.rangeStart != undefined) && (scope.rangeStart != '')) {
                            console.log('YES');
                            var userStart = moment(scope.rangeStart, 'YYYY-MM-DD').format('YYYY/MM/DD');
                            angular.element(element).datetimepicker({
                                lazyInit: true,
                                timepicker: false,
                                format: 'Y-m-d',
                                minDate: userStart,
                                startDate: userStart
                            })[0];
                        } else {
                            console.log('nodate');
                            angular.element(element).datetimepicker({
                                lazyInit: true,
                                timepicker: false,
                                format: 'Y-m-d'
                            })[0];
                        }
                    })[0].click();
                }
            };
        })
        .filter('spcToHyphen', function() {
            return function(input) {
                if (input) {
                    return input.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace("/", '-');
                }
            }
        })
        .filter('progType', function() {
            return function(items, predicate) {
                switch (predicate) {
                    case 'movies':
                        var movies = [];
                        angular.forEach(items, function(item) {
                            if (item.dayWeek === null) {
                                movies.push(item);
                            }
                        });
                        return movies;
                        break;
                    case 'series':
                        var series = [];
                        angular.forEach(items, function(item) {
                            if (item.dayWeek !== null) {
                                series.push(item);
                            }
                        });
                        return series;
                        break;
                    default:
                        return items;
                        break;
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
                if ((!endDate) || (startDate == '') || (startDate == undefined)) {
                    return items;
                }
                var matches = [];
                angular.forEach(items, function(value, key) {
                    var itemDate = moment(value.premDate,'YYYY-MM-DD');
                    var s = moment(startDate,'YYYY-MM-DD');
                    var e = moment(endDate,'YYYY-MM-DD'); + 86399999;
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
            if (typeof source[i].genres[n] === 'string') { // cause IE
                genres.push(source[i].genres[n]);
            }
        }
    }
    return genres;
}
