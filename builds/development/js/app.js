var myApp = angular.module('myApp', ['ngRoute',
        'firebase', 'appControllers'
    ])
    .constant('FIREBASE_URL', 'https://join-my-party.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/checkin.html',
            controller: 'CheckinController'
        }).
        when('/post', {
            templateUrl: 'views/posting.html',
            controller: 'mainController'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }
]);