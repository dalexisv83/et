/*jslint unparam: true*/
var encode = function(input) {
    'use strict';
    if (input) {
        return encodeURIComponent(input);
    }
};

(function(angular) {
    'use strict';
    angular.module('filters.encode', [])
        .filter('encode', function() {
            return encode;
        });
}(window.angular));
/*jslint unparam: false*/
