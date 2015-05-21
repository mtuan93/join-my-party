var myApp = angular.module('myApp', ['ngRoute',
        'firebase', 'appControllers', 'jp.ng-bs-animated-button'
    ])
    .constant('FIREBASE_URL', 'https://join-my-party.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location',
    function($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error === 'AUTH_REQUIRED') {
                    $location.path('/checkin');
                }
            });

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if ($rootScope.currentUser) {
                if (next.templateUrl === 'views/checkin.html') {
                    $location.path("/post"); // redirect to posting.html if logged in
                }
            } else {
                $location.path("/checkin"); //if not logged in, always point to checkin.html
            }
        });
    }
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/checkin', {
            templateUrl: 'views/checkin.html',
            controller: 'CheckinController'
        }).
        when('/post', {
            templateUrl: 'views/posting.html',
            controller: 'CheckinController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        otherwise({
            redirectTo: '/checkin'
        });
    }
]);