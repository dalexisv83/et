(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('CalCtrl', ['$scope', '$routeParams', '$location', '$filter',
            function($scope, $routeParams, $location, $filter) {
                this.name = "CalCtrl";
                this.params = $routeParams;
                $scope.aParam = function(param, value, filter, filterparam1, filterparam2, filterparam3) {
                    if (filter) {
                        value = $filter(filter)(value, filterparam1, filterparam2, filterparam3);
                    }
                    $location.search(param, value);
                }
                $scope.$watch(function() {
                    return $location.search()
                }, function(params) {
                    $scope.genSel = params.genre;
                    var filteredModel = $filter('getItByThat')(params.premium, $scope.data.premiums, 'id','name');
                    $scope.premSel = filteredModel;
                    $scope.typeSel = params.type;
                    $scope.chanSel = params.channel;
                    $scope.progSel = params.program;
                });
                $scope.$watch('genSel', function() {
                    $location.search('genre', $scope.genSel);
                });
                $scope.$watch('premSel', function() {
                    var filteredModel = $filter('getItByThat')($scope.premSel, $scope.data.premiums, 'name', 'id');
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
