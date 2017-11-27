(function (angular) {
    'use strict';
    angular.module('entertainment')
        .controller('AvailCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', '$q',
            function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, $q) {
                var getRsn = $http.jsonp($scope.basePath + 'web/api/rsn/' + $scope.zipClick + '?callback=JSON_CALLBACK').then(function successTest(response) {
                        return response;
                    }, function errorTest(response) {
                        throw new Error(JSON.stringify(response));
                    }),
                    getDsse = $http.jsonp('assets/datasource/dsset.js?callback=JSON_CALLBACK', { cache: true }).then(function successTest(response) {
                        return response;
                    }, function errorTest(response) {
                        throw new Error(JSON.stringify(response));
                    });
                $q.all([getRsn, getDsse]).then(function (values) {
                    console.log(values);
                });
            }
        ]);
}(window.angular));