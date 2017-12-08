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
                            var games = [];
                            _.each(values[1].data, function (game, gInd) {
                                game.inMarket = null;
                                games.push(game);
                                _.each(values[0].data, function (rsn, rInd) {
                                    if (rsn.chanNum == game["Channel"]) {
                                        if (game["Home"].indexOf(rsn.MLB) > -1) {
                                            console.log("Home");
                                            game.inMarket = true;
                                        }
                                        if (game["Home"].indexOf(rsn.NBA) > -1) {
                                            console.log("Home");
                                            game.inMarket = true;
                                        }
                                        if (game["Home"].indexOf(rsn.NHL) > -1) {
                                            console.log("Home");
                                            game.inMarket = true;
                                        }
                                        if (game["Away"].indexOf(rsn.MLB) > -1) {
                                            console.log("Away");
                                            game.inMarket = true;
                                        }
                                        if (game["Away"].indexOf(rsn.NBA) > -1) {
                                            console.log("Away");
                                            game.inMarket = true;
                                        }
                                        if (game["Away"].indexOf(rsn.NHL) > -1) {
                                            console.log("Away");
                                            game.inMarket = true;
                                        }
                                    }
                                });
                            });
                            return games;
                        },
                        function(values) {
                            throw new Error(JSON.stringify(values));
                        }
                    );

                $scope.dsseOptions = DTOptionsBuilder.fromFnPromise(getData);
                $scope.dsseColumns = [
                    DTColumnBuilder.newColumn('Event_Date').withTitle('Date'),
                    DTColumnBuilder.newColumn('Home').withTitle('Home'),
                    DTColumnBuilder.newColumn('Away').withTitle('Away'),
                    DTColumnBuilder.newColumn('inMarket').withTitle('In Market'),
                    DTColumnBuilder.newColumn(null).withTitle('Channel').renderWith(function (data, type, full, meta) {
                        console.log(data);
                        return data.inMarket ? data["Channel"] : data["Sport_Channel"];
                    })
                ];
                $scope.dsseInstance = {};
            }
        ]);
}(window.angular));