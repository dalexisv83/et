(function(angular) {
    'use strict';
    angular.module('entertainment')
        .controller('ChooseCtrl', [function() {
            this.name = 'ChooseCtrl';
            this.choices = [{
                "id": 1,
                "name": "Entertainment Tool",
                "url": "entertainment/hbo/overview"
            }, {
                "id": 2,
                "name": "Sports Sales Tool",
                "url": "sports/nfl-sunday-ticket-max/overview"
            }];
        }]);
}(window.angular));