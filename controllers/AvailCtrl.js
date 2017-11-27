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
                    }),
                    getData = $q.all([getRsn, getDsse]).then(
                        function (values) {
                            return values[1].data;
                        },
                        function(values) {
                            throw new Error(JSON.stringify(values));
                        }
                    );

                $scope.dsseOptions = DTOptionsBuilder.fromFnPromise(getData);
                $scope.dsseColumns = [
                    DTColumnBuilder.newColumn('Event_Date').withTitle('Date'),
                    DTColumnBuilder.newColumn('Home').withTitle('Home'),
                    DTColumnBuilder.newColumn('Away').withTitle('Away')
                ];
                $scope.dsseInstance = {};
            }
        ]);
}(window.angular));