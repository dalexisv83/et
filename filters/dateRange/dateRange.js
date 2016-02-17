/*jslint unparam: true*/
var dateRange = function(items, startDate, endDate) {
    'use strict';
    if ((!endDate) || (startDate === '') || (startDate === undefined)) {
        return items;
    }
    var matches = [];
    angular.forEach(items, function(value, key) {
        var itemDate = moment(value.premDate, 'YYYY-MM-DD'),
            s = moment(startDate, 'YYYY-MM-DD'),
            e = moment(endDate, 'YYYY-MM-DD') + 86399999;
        if (itemDate >= s && itemDate <= e) {
            matches.push(value);
        }
    });
    return matches;
};

(function(angular) {
    'use strict';
    angular.module('filters.dateRange', [])
        .filter('dateRange', function() {
            return dateRange;
        });
}(window.angular));
/*jslint unparam: false*/