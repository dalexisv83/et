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
                    return $resource('assets/datasource/' + toolName + '.js?@@BUSTER@@',{},{'get': { method:'GET', cache: true}});
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
        .controller('HtmlCtrl', ['$scope', '$routeParams',
            function ($scope, $routeParams) {
                $scope.params = $routeParams;
                $scope.toolHdr = function (test) {
                    if (test) {
                        switch (test) {
                            case 'entertainment':
                                return 'Entertainment Tool';
                            case 'sports':
                                return 'Sports Sales Tool';
                        }
                    }
                };
            }
        ])
        .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$filter', 'contentData', '$timeout', '$cookies', 'pathFinder',
            function ($scope, $route, $routeParams, $location, $filter, contentData, $timeout, $cookies, pathFinder) {
                pathFinder.getApiNet().then(function successTest(response) {
                    $scope.basePath = response;
                });
                $scope.$watch(function () {
                    return $cookies;
                }, function (value) {
                    $scope.spOverlay = value;
                });
                $scope.$watch('spOverlay', function () {
                    $cookies.sports = $scope.spOverlay['sports'];
                });
                $scope.$watch('etOverlay', function () {
                    $cookies.entertainment = $scope.spOverlay['entertainment'];
                });
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
                    if (($routeParams.tool !== undefined) && ($routeParams.premName !== undefined) && ($routeParams.premName !== 'calendar') && ($routeParams.premName !== 'lookup') && ($routeParams.premName !== 'troubleshoot') && ($routeParams.subName === undefined)) {
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
                        case 'troubleshoot':
                            return 'views/game-locator.htm?' + Date.now();
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
        .controller('LookupCtrl', ['$scope', '$timeout', '$http',
            function ($scope, $timeout, $http) {
                $scope.submitted = false;
                $scope.zip = null;
                $scope.lookup = null;
                $scope.zipClick = null;
                $scope.clickRsn = function () {
                    var init = function() {
                            $scope.lookup = null;
                            $scope.lookup = 'rsn';
                            $scope.zipClick = $scope.zip;
                            $scope.$broadcast('zipChanged', $scope.zipClick);
                        };
                    $scope.submitted = true;
                    
                    // isNaN condition adds compatibility with IE8
                    if ($scope.zipcode.$valid || !isNaN(JSON.stringify($scope.zipcode.zip.$modelValue))) {
                        if (!$scope.rsnurls) {
                            $http.jsonp($scope.basePath + 'web/api/rsnlinks', { params: { 'callback': 'JSON_CALLBACK' }, cache: true }).then(function successTest(response) {
                                $scope.rsnurls = response.data;
                                init();
                            }, function errorTest(response) {
                                throw new Error(JSON.stringify(response));
                            });
                        } else {
                            init();
                        }
                    }
                };
                $scope.clickAvail = function() {
                    if (($scope.zip !== $scope.zipClick) || ($scope.lookup !== 'availability')) {
                        $scope.submitted = true;
                            // isNan condition adds compatibility with IE8
                            if ($scope.zipcode.$valid || !isNaN(JSON.stringify($scope.zipcode.zip.$modelValue))) {
                                $scope.lookup = null;
                                $scope.lookup = 'availability';
                                $scope.zipClick = $scope.zip;
                        }
                    }
                };
            }
        ]);
}(window.angular));

(function(angular) {
    'use strict';
    angular.module('entertainment')
        .service('pathFinder', ['URLS', '$location', '$http',
            function (URLS, $location, $http) {
                this.getApiNet = function() {
                    var location = $location.host(),
                        network = function(network) {
                            var basePath;
                            switch (network) {
                                case 'intra':
                                    basePath = URLS.API_INTRA;
                                    break;

                                case 'stage':
                                    basePath = URLS.API_STAGE;
                                    break;

                                case 'extra':
                                    basePath = URLS.API_EXTRA;
                                    break;

                                case 'test':
                                    basePath = URLS.API_DEV;
                                    break;
                            }
                            return basePath;
                        };
                    if (location == 'vwecda05.testla.testfrd.directv.com' || location == 'localhost') {
                        return $http.jsonp('https://intra3.web.att.com/toolupdater/Web/api/values/1?callback=JSON_CALLBACK').then(function successTest(response){
                            return network('test');
                        });
                    } else if (location == 'zlp09097.vci.att.com') {
                        return $http.jsonp('https://intra3.web.att.com/toolupdater/Web/api/values/1?callback=JSON_CALLBACK').then(function successTest(response){
                            return network('stage');
                        });
                    } else {
                        return $http.jsonp('https://intra3.web.att.com/toolupdater/Web/api/values/1?callback=JSON_CALLBACK').then(function successTest(response) {
                            return network('intra');
                        }, function errorTest(response) {
                            return network('extra');
                        });
                    }
                }
            }
        ])
        .controller('RsnCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$filter',
            function ($scope, DTOptionsBuilder, DTColumnBuilder, $filter) {
                var ajaxObj = function() {
                        return {
                            url: $scope.basePath + 'web/api/rsn/' + $scope.zipClick,
                            dataType: 'jsonp',
                            jsonpCallback: 'jsonCallback',
                            cache: true
                        }
                    },
                    headerTxt = '<small class="minReq">Minimum Required Packages:</small><br>',
                    urlRender = function() {
                        return function (data, type, full) {
                            var str = '';
                            if (data) {
                                str = '<a href="https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=' +$filter('getItByThat') (data, $scope.rsnurls, 'cspUrl', 'name') + '" target="_blank">' +data + '</a>';
                            }
                            return str;
                        }
                    };
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                    .withDOM('rt')
                    .withOption('ajax', ajaxObj());

                $scope.dtColumns =[
                    DTColumnBuilder.newColumn('ZIP_CODE').withTitle('Zip Code'),
                    DTColumnBuilder.newColumn('STATE').withTitle('ST'),
                    DTColumnBuilder.newColumn('CHOICE_MAS_ULTRA').withTitle(headerTxt + 'Choice / Mas Ultra').renderWith(urlRender()),
                    DTColumnBuilder.newColumn('XTRA').withTitle(headerTxt + 'Xtra').renderWith(urlRender()),
                    DTColumnBuilder.newColumn('SPORTS_PACK').withTitle(headerTxt + 'Choice / Mas Ultra with Sports Pack').renderWith(urlRender()),
                    DTColumnBuilder.newColumn('MLB').withTitle('Baseball'),
                    DTColumnBuilder.newColumn('NBA').withTitle('Basketball'),
                    DTColumnBuilder.newColumn('NHL').withTitle('Hockey')
                ];

                $scope.rsnInstance = {
                }

                $scope.$on('zipChanged', function (event, args) {
                    if (args != $scope.lastZip) {
                        $scope.lastZip = args;
                        $scope.rsnInstance.changeData(ajaxObj());
                }
                });
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
