//Converts time strings to decimals for ordering ('8:30 PM' -> 20.5)
var strTimeOrder = function(obj) {
        "use strict";
        if (obj.premTime) {
            var mins = obj.premTime.replace(/\:/g, '-').replace(/\s/g, '-').split('-'),
                i,
                l = mins.length;
            for (i=0; i<l-1; i+=1) {
                mins[i] = parseInt(mins[i], 10);
            }
            if (l === 3) {
                mins[0] += mins[1]/60;
            }
            if ((mins[l-1] === "PM") && (mins[0] < 12)) {
                mins[0] += 12;
            }
            return mins[0];
        }
    },

    // source: $scope.data.calendars
    getGenres = function(source) {
        'use strict';
        var genres = [],
            i,
            n;
        for (i=0; i<source.length; i+=1) {
            for (n=0; n<source[i].genres.length; n+=1) {
                if (typeof source[i].genres[n] === 'string') { // cause IE
                    genres.push(source[i].genres[n]);
                }
            }
        }
        return genres;
    };

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('CalCtrl', ['$scope', '$routeParams', '$location', '$filter',
            function($scope, $routeParams, $location, $filter) {
                this.name = 'CalCtrl';
                this.params = $routeParams;
                $scope.orderStrTime = strTimeOrder;
                $scope.genres = getGenres($scope.data.calendars);
                $scope.$watch(function() {
                    return $location.search();
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
        ]);
}(window.angular));