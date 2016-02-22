/*jslint unparam: true*/
var cycleSlideshow = function(el) {
        'use strict';
        if (jQuery.fn.cycle) {
            el.cycle();
            el.hover(
                function() {
                    $(this).cycle('pause');
                },
                function() {
                    $(this).cycle('resume');
                }
            );
        }
    };

(function(angular) {
    'use strict';
    angular.module('directives.cycleSlideshow', [])
        .directive("cycleSlideshow", function() {
            return function(scope, element, attrs) {
                setTimeout(function() {
                    return cycleSlideshow(element);
                }, 250);
            };
        });
}(window.angular));
/*jslint unparam: false*/