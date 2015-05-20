var myApp = angular.module('myApp', ['ngRoute',
        'firebase', 'appControllers'
    ])
    .constant('FIREBASE_URL', 'https://join-my-party.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

// myApp.run(['$rootScope', '$location',
//     function($rootScope, $location) {
//         $rootScope.$on('$routeChangeError',
//             function(event, next, previous, error) {
//                 if (error === 'AUTH_REQUIRED') {
//                     $location.path('/login');
//                 }
//             });
//     }
// ]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).
        when('/app', {
            templateUrl: 'views/app.html',
            controller: 'mainController'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }
]);