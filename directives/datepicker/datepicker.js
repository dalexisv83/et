/*jslint unparam: true*/
var kmsdatepicker = function(el, atts) {
    'use strict';
    if ((jQuery.fn.datepicker) && (!Modernizr.inputtypes.date)) {
        atts.datepicker = atts.datepicker.replace(/^(.*):/, "\"$1\":").replace((/'/g), "\"");
        atts.datepicker = "{" + atts.datepicker + "}";
        atts.datepicker = JSON.parse(atts.datepicker);
        jQuery(el).datepicker(atts.datepicker);
    }
};

(function(angular) {
    'use strict';
    angular.module('directives.datepicker', [])
        .directive("datepicker", function() {
            return function(scope, element, attrs) {
                return kmsdatepicker(element, attrs);
            };
        });
}(window.angular));
/*jslint unparam: false*/