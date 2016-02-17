/*jslint unparam: true*/
var progType = function(items, predicate) {
        'use strict';
        var filtered = [],

            getItems = function(situation) {
                angular.forEach(items, function(item) {
                    if (situation === 'movies') {
                        if (item.dayWeek === null) {
                            filtered.push(item);
                        }
                    } else if (situation === 'series') {
                        if (item.dayWeek !== null) {
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };

        switch (predicate) {
            case 'Movies':
            case 'movies':
                return getItems('movies');
            case 'original-programming':
            case 'Series':
            case 'series':
                return getItems('series');
            default:
                return items;
        }
    };

(function(angular) {
    'use strict';
    angular.module('entertainment', ['entertainment.filters', 'ngRoute'])
        .directive("checker", function() {
            return function(scope, element, attrs) {
                element.bind('click', function(e) {
                    jQuery('.checked').removeClass();
                    element.next().next().toggleClass("checked");
                    angular.element(document.body).addClass('ieFix').removeClass('ieFix');
                });
            };
        })
        .directive("dropdown", function() {
            return function(scope, element, attrs) {
                element.bind('click', function(e) {
                    element.toggleClass("checked");
                    element.next().next().toggleClass("checked");
                    angular.element(document.body).addClass('ieFix').removeClass('ieFix');
                });
            };
        })
        .directive("errHide", function() {
            return function(scope, element, attrs) {
                element.bind('error', function(e) {
                    element.hide();
                    element.parent('a').hide();
                    element.parent('a').next('br').hide();
                });
            };
        })
        .directive("cycleSlideshow", function() {
            return function(scope, element, attrs) {
                if (jQuery.fn.cycle) {
                    setTimeout(function() {
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
            return function(scope, element, attrs) {
                if ((jQuery.fn.datepicker) && (!Modernizr.inputtypes.date)) {
                    angular.element(element).datepicker({dateFormat:'yy-mm-dd'});
                }
            };
        })
        .filter('progType', function() {
            return progType;
        });
}(window.angular));
/*jslint unparam: false*/