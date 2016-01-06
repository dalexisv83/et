(function(angular) {
    'use strict';
    angular.module('entertainment', ['ngRoute'])
        .controller('CalCtrl', ['$scope', '$routeParams', '$location', '$filter',
            function($scope, $routeParams, $location, $filter) {
                this.name = "CalCtrl";
                this.params = $routeParams;
                $scope.aParam = function(param, value, filter, filterparam) {
                    if (filter) {
                        value = $filter(filter)(value, filterparam);
                    }
                    $location.search(param, value);
                }
                $scope.$watch(function() {
                    return $location.search()
                }, function(params) {
                    $scope.genSel = params.genre;
                    var filteredModel = $filter('getByName')(params.premium, $scope.data.premiums);
                    $scope.premSel = filteredModel;
                    $scope.typeSel = params.type;
                    $scope.chanSel = params.channel;
                    $scope.progSel = params.program;
                });
                $scope.$watch('genSel', function() {
                    $location.search('genre', $scope.genSel);
                });
                $scope.$watch('premSel', function() {
                    var filteredModel = $filter('getById')($scope.premSel, $scope.data.premiums);
                    $location.search('premium', filteredModel);
                });
                $scope.$watch('typeSel', function() {
                    $location.search('type', $scope.typeSel);
                });
                $scope.$watch('chanSel', function() {
                    $location.search('channel', $scope.chanSel);
                });
                $scope.$watch('progSel', function() {
                    $location.search('program', $scope.progSel);
                });
            }
        ])
})(window.angular);
