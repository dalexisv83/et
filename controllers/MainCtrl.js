var checkSubs = function(obj, premium, sub) {
        "use strict";
        var i,
            n;
        if (obj && premium && sub) {
            for (i=0; i<obj.premiums.length; i+=1) {
                if (obj.premiums[i].id === premium) {
                    for (n=0; n<obj.premiums[i].subs.length; n+=1) {
                        if (obj.premiums[i].subs[n] === sub) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }
    },

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
    },

    stringIsNumber = function(s) {
        "use strict";
        var x = +s; // made cast obvious for demonstration
        return x.toString() === s;
    };


(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$filter',
            function($scope, $route, $routeParams, $location, $filter) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.params = $routeParams;
                $scope.data = data;
                $scope.versus = versus;
                $scope.isStringNumber = stringIsNumber;
                $scope.selChecks = {
                    "services": {
                        "DIRECTV": true,
                        "Sling TV": true,
                        "Hulu": true,
                        "Netflix": true,
                        "Amazon Prime Video": true
                    }
                };
                $scope.genres = getGenres($scope.data.calendars);
                this.init = function() {
                    var premNameFiltered = $filter('getItByThat')(this.$routeParams.premName, $scope.data.premiums, 'id', 'url'),
                        subNameFiltered = $filter('getItByThat')(this.$routeParams.subName, $scope.data.subtabs, 'id', 'url');
                    if ((this.$routeParams.premName !== undefined) && (this.$routeParams.subName === undefined)) {
                        $location.path(this.$routeParams.premName + '/overview');
                    }
                    if ((this.$routeParams.premName !== undefined) && (this.$routeParams.subName !== undefined)) {
                        if (!checkSubs($scope.data, premNameFiltered, subNameFiltered)) {
                            $location.path(this.$routeParams.premName + '/overview');
                        }
                    }
                };
                this.init();
            }
        ]);
}(window.angular));