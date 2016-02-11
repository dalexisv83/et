/*jslint unparam: true*/
var getItByThat = function(input, obj, it, that) {
    'use strict';
    var match = null;
    jQuery.each(obj, function() {
        if (this[that] === input) {
            match = this[it];
        }
    });
    return match;
};

(function(angular) {
    'use strict';
    angular.module('filters.getItByThat', [])
        .filter('getItByThat', function() {
            return getItByThat;
        });
}(window.angular));
/*jslint unparam: false*/