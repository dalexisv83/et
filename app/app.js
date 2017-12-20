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
    angular.module('entertainment', ['entertainment.filters', 'entertainment.directives', 'ngRoute', 'ngSanitize', 'ngResource', 'datatables', 'ngCookies', 'constants.urls'])
        .filter('getById', function() {
            return function(input, obj) {
                var match = null;
                angular.forEach(obj, function(value, key) {
                    if (value.id === input) {
                        match = value.name;
                    }
                });
                return match;
            };
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
            };
        })
        .filter('getByName', function() {
            return function(name, obj) {
                var match = null;
                angular.forEach(obj, function(value, key) {
                    var normal = value.name.replace(/\s+/g, '-').replace("(", '').replace(")", '').replace("/", '-');
                    if (normal === name) {
                        match = value.id;
                    }
                });
                return match;
            };
        })
        .filter('progType', function() {
            return progType;
        });
}(window.angular));
/*jslint unparam: false*/