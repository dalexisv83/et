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

    stringIsNumber = function(s) {
        "use strict";
        var x = +s; // made cast obvious for demonstration
        return x.toString() === s;
    },

    getChildren = function (input) {
        'use strict';
        var i,
            parent,
            children = [];
        for (i = input.length - 1; i >= 0; i -= 1) {
            if (input[i].category === parent) {
                children.push(input[i].name);
                children.push(input[i+1].name);
            }
            parent = input[i].category;
        }
        return children;
    },

    checkRange = function(items, model) {
        'use strict';
        if (items) {
            var matches = [];
            angular.forEach(items, function(value) {
                var zips = value.ZIP_CODE.split('-');
                zips[0]= Number(zips[0]);
                if (zips[1]) {
                    zips[1] = Number(zips[1]);
                }
                model = Number(model);
                if (model === zips[0]) {
                    matches.push(value);
                }
                if ((model > zips[0]) && (model <= zips[1])) {
                    matches.push(value);
                }
            });
            if (!matches.length) {
                matches = false;
            }
            return matches;
        }
    };


(function(angular) {
    'use strict';
    angular.module('entertainment')
        .factory('Content', [
            '$resource',
            function ($resource){
                return function(toolName){
                    return $resource('data/' + toolName + '.htm?@@BUSTER@@',{},{'get': { method:'GET', cache: true}});
                };
            }]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .factory('ContentFactory', [
            'Content',
            function (Content){
                return function(toolName){
                    var contentFactory = new Content(toolName);
                    return contentFactory;
                };
            }]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .factory('ContentPromise', [
            'ContentFactory',
            function (ContentFactory){
                return function(toolName) {
                    return new ContentFactory(toolName).get().$promise.then(
                        function(data) {
                            return data;
                        }, function () {
                            return null;
                        }
                    );
                };
            }]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$filter', 'contentData', '$timeout',
            function($scope, $route, $routeParams, $location, $filter, contentData, $timeout) {
                if (window.location.hash.search('trivia') > -1) {
                    $timeout(function() {
                        document.getElementById('trivia').scrollIntoView();
                    }, 200);
                }
                if (!contentData) {
                    $location.path('choose').replace();
                }
                this.name = 'MainCtrl';
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.params = $routeParams; // redundant?
                $scope.data = contentData;
                $scope.tool = function(test) {
                    if (test) {
                        switch (test) {
                            case 'entertainment':
                                return 'hdr_entertainment.png';
                            case 'sports':
                                return 'hdr_sports.png';
                        }
                    }
                    return false;
                };
                $scope.aParam = function(param, value, filter, filterparam1, filterparam2, filterparam3) {
                    if (filter) {
                        value = $filter(filter)(value, filterparam1, filterparam2, filterparam3);
                    }
                    $location.search(param, value);
                };
                $scope.$watch(function() {
                    return $location.search();
                }, function(params) {
                    $scope.trivia = params.trivia;
                });
                $scope.$watch('trivia', function() {
                    $location.search('trivia', $scope.trivia);
                });
                if ($scope.data) {
                    $scope.children = getChildren($scope.data.premiums);
                    $scope.premium = $filter('filter')($scope.data.premiums, { url: $routeParams.premName })[0];
                    var premNameFiltered = $filter('getItByThat')($routeParams.premName, $scope.data.premiums, 'id', 'url'),
                        subNameFiltered = $filter('getItByThat')($routeParams.subName, $scope.data.subtabs, 'id', 'url');
                    if (($routeParams.tool !== undefined) && ($routeParams.premName !== undefined) && ($routeParams.premName !== 'calendar') && ($routeParams.premName !== 'lookup') && ($routeParams.premName !== 'game-locator') && ($routeParams.subName === undefined)) {
                        $location.path($routeParams.tool + '/' + $routeParams.premName + '/overview').replace();
                    }
                    if (($routeParams.premName !== undefined) && ($routeParams.subName !== undefined)) {
                        if (!checkSubs($scope.data, premNameFiltered, subNameFiltered)) {
                            $location.path($routeParams.tool + '/' + $routeParams.premName + '/overview').replace();
                        }
                    }
                }
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
                $scope.scrollTo = function(hash) {
                    document.getElementById(hash).scrollIntoView();
                };
            }
        ]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .directive('subView', ['$routeParams', function($routeParams) {
            return {
                templateUrl: function() {
                    if ($routeParams.tool === 'choose') {
                        return 'views/choose.htm';
                    }
                    switch($routeParams.premName) {
                        case 'game-locator':
                            return 'views/game-locator.htm';
                        case 'calendar':
                            return 'views/calendar.htm';
                        case 'lookup':
                            return 'views/lookup.htm';
                        default:
                            return 'views/premium.htm?@@BUSTER@@';
                    }
                }
            };
        }]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('LookupCtrl', ['$scope', '$timeout',
            function($scope, $timeout) {
                $scope.submitted = false;
                $scope.zip = null;
                $scope.lookup = null;
                $scope.zipClick = null;
                $scope.clickRsn = function() {
                    $scope.submitted = true;
                    
                    // isNaN condition adds compatibility with IE8
                    if ($scope.zipcode.$valid || !isNaN(JSON.stringify($scope.zipcode.zip.$modelValue))) {
                        $scope.lookup = null;
                        $scope.lookup = 'rsn';
                        $scope.zipClick = $scope.zip;
                    }
                };
                $scope.clickAvail = function() {
                    if (($scope.zip !== $scope.zipClick) || ($scope.lookup !== 'availability')) {
                        $scope.submitted = true;
                        // isNan condition adds compatibility with IE8
                        if ($scope.zipcode.$valid || !isNaN(JSON.stringify($scope.zipcode.zip.$modelValue))) {
                            $scope.lookup = null;
                            $timeout(function(){
                                $scope.lookup = 'availability';
                                $scope.zipClick = $scope.zip;
                            }, 0);
                        }
                    }
                };
            }
        ]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('AvailCtrl', ['$scope', '$timeout',
            function($scope, $timeout) {
                $scope.init = function() {
                    $timeout(function(){start($scope.$parent.zipClick);}, 100);
                };
                $scope.init();
            }
        ]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('RsnCtrl', ['$scope', 'DTOptionsBuilder',
            function($scope, DTOptionsBuilder) {
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withDOM('rt');
                $scope.rsndata = rsnzip; // $http.get("http://agentanswercenter.directv.com/en-us/res/rover_tools/rsn/rsnzip.js");
            }
        ]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .filter('checkRange', function() {
            return checkRange;
        });
}(window.angular));

// (function(angular) {
//     'use strict';
//     angular.module('entertainment')
//         .controller('LocCtrl', ['$scope', '$routeParams',
//             function($scope, $routeParams) {
//                 $scope.params = $routeParams;
//             }
//         ]);
// }(window.angular));

// (function(angular) {
//     'use strict';
//     angular.module('entertainment')
//         .filter('trust', ['$sce',
//             function($sce) {
//                 return $sce.trustAsHtml;
//             }
//         ]);
// }(window.angular));
