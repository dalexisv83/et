/*jslint unparam: true*/
var dropCheck = function(el, att) {
        'use strict';
        el.attr('ieFixed', false);
        var $body = $(document.body);
        el.bind('click', function(e) {
            if (att.checker === '') {
                $('.checked', el.parent()).removeClass();
            }
            el.next().next().toggleClass("checked");
            $body.addClass('ieFix');
            el.attr('ieFixed', true);
            $body.removeClass('ieFix');
        });
    };

(function(angular) {
    'use strict';
    angular.module('directives.dropCheck', [])
        .directive("checker", function() {
            return function(scope, element, attrs) {
                return dropCheck(element, attrs);
            };
        })
        .directive("dropdown", function() {
            return function(scope, element, attrs) {
                return dropCheck(element, attrs);
            };
        });
}(window.angular));
/*jslint unparam: false*/