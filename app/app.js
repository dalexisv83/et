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
    angular.module('entertainment', ['entertainment.filters', 'entertainment.directives', 'ngRoute'])
        .filter('progType', function() {
            return progType;
        });
}(window.angular));
/*jslint unparam: false*/