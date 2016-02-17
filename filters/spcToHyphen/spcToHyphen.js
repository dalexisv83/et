/*jslint unparam: true*/
var spcToHyphen = function(input) {
    'use strict';
    if (input) {
        return input.replace(/\s+/g, '-').replace(/\(/g, '').replace(/\)/g, '').replace(/:/g, '').replace(/\./g, '').replace(/\'/g, '').replace(/\//g, '-').replace(/\"/g, '');
    }
};

(function(angular) {
    'use strict';
    angular.module('filters.spcToHyphen', [])
        .filter('spcToHyphen', function() {
            return spcToHyphen;
        });
}(window.angular));
/*jslint unparam: false*/