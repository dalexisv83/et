(function(angular) {
    'use strict';
    angular.module('entertainment.filters', [
        'filters.getItByThat',
        'filters.spcToHyphen',
        'filters.encode',
        'filters.unique',
        'filters.dateRange'
    ]);
}(window.angular));
