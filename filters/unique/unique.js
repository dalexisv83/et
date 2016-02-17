/*jslint unparam: true*/
/**
 * https://github.com/angular-ui/angular-ui-OLDREPO/tree/master/modules/filters/unique
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
var unique = function(items, filterOn) {
    'use strict';
    if (filterOn === false) {
        return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        var newItems = [],

            extractValueToCompare = function(item) {
                if ((angular.isObject(item)) && (angular.isString(filterOn))) {
                    return item[filterOn];
                }
                return item;
            };

        angular.forEach(items, function(item) {
            var i, isDuplicate = false;

            for (i = 0; i < newItems.length; i+=1) {
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

(function(angular) {
    'use strict';
    angular.module('filters.unique', [])
        .filter('unique', function() {
            return unique;
        });
}(window.angular));
/*jslint unparam: false*/
