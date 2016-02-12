(function(angular) {
    'use strict';
    angular.module('entertainment', ['entertainment.filters', 'ngRoute'])
        .directive("checker", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                element.bind('click', function(e) {
                    jQuery('.checked').removeClass();
                    element.next().next().toggleClass("checked");
                    angular.element(document.body).addClass('ieFix').removeClass('ieFix');
                });
            };
        })
        .directive("dropdown", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                element.bind('click', function(e) {
                    element.toggleClass("checked");
                    element.next().next().toggleClass("checked");
                    angular.element(document.body).addClass('ieFix').removeClass('ieFix');
                });
            };
        })
        .directive("errHide", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                element.bind('error', function(e) {
                    element.hide();
                    element.parent('a').hide();
                    element.parent('a').next('br').hide();
                });
            };
        })
        .directive("cycleSlideshow", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                if (jQuery.fn.cycle) {
                    setTimeout(function(){
                        element.cycle();
                    }, 250);
                    element.hover(
                        function() {
                            $(this).cycle('pause');
                        },
                        function() {
                            $(this).cycle('resume');
                        }
                    );
                }
            };
        })
        .directive("datepicker", function() {
            'use strict';
            /*jslint unparam: true*/
            return function(scope, element, attrs) {
                if ((jQuery.fn.datetimepicker) && (!Modernizr.inputtypes.date)) {
                    angular.element(element).on('click focus', function(e) {
                        if ((attrs.min) && (scope.rangeStart != undefined) && (scope.rangeStart != '')) {
                            var userStart = moment(scope.rangeStart, 'YYYY-MM-DD').format('YYYY/MM/DD');
                            angular.element(element).datetimepicker({
                                lazyInit: true,
                                timepicker: false,
                                format: 'Y-m-d',
                                minDate: userStart,
                                startDate: userStart
                            })[0];
                        } else {
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
                    return input.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace(":", '').replace(".", '').replace("'", '').replace('"', '').replace("/", '-');
                }
            }
        })
        .filter('encode', function() {
            return function(input) {
                if (input) {
                    return encodeURIComponent(input);
                }
            }
        })
        .filter('progType', function() {
            return function(items, predicate) {
                switch (predicate) {
                    case 'Movies':
                    case 'movies':
                        var movies = [];
                        angular.forEach(items, function(item) {
                            if (item.dayWeek === null) {
                                movies.push(item);
                            }
                        });
                        return movies;
                        break;
                    case 'original-programming':
                    case 'Series':
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

var checkSubs = function(obj,premium,sub) {
    if ((obj) && (premium) && (sub)) {
        for (var i in obj.premiums) {
            if (obj.premiums[i].id == premium) {
                for (var n in obj.premiums[i].subs) {
                    if (obj.premiums[i].subs[n] == sub) {
                        return true;
                    }
                }
            }
        }
    }
}

var stringIsNumber = function (s) {
    var x = +s; // made cast obvious for demonstration
    return x.toString() === s;
}