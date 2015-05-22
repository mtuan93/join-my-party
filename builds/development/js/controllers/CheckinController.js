myApp.controller('CheckinController',
    function($scope, $firebase, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        var ref = new Firebase(FIREBASE_URL + '/users/');
        $scope.allUsers = $firebase(ref).$asArray();

        // Required - set to true on submission
        $scope.isSubmitting = null;

        // Required - set to 'success' or 'error' on success/failure
        $scope.result = null;

        // Optional
        $scope.options = {
            buttonSubmittingIcon: 'fa fa-spinner',
            buttonSubmittingText: 'Processing',
            buttonSuccessText: 'Logging in',
            animationCompleteTime: '2000',
            iconPosition: 'left',
            buttonErrorText: 'Not Verified'
        };

        if ($location.$$path === '/checkin') {
            $scope.options.buttonDefaultText = 'Start Checking';
        } else if ($location.$$path === '/checkinList') {
            $scope.options.buttonDefaultText = 'Checkin!';
        } 

        $scope.go = function(path) {
            $location.path(path);
        }; //go

        $scope.register = function() {
            Authentication.register($scope.user)
                .then(function() {
                    Authentication.login($scope.user)
                        .then(function() {
                            $scope.isSubmitting = true;
                            return $timeout(function() {
                                $scope.result = 'success';
                            }, 2000);
                        }).then(function() {
                            return $timeout(function() {
                                $location.path('/post');
                            }, 2000);
                        });
                });
        }; //register

        $scope.logout = function() {
            Authentication.logout();
            $rootScope.currentUser = '';
            $location.path('/login');
        }; //logout

        $scope.submitCheckin = function() {
            $scope.options.buttonSuccessText = 'Submitting';
            $scope.options.animationCompleteTime = '500';
            var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id);
            var userInfo = $firebase(ref);
            var userObj = userInfo.$asObject();
            userInfo.$update({
                message: $scope.message,
                checkinTime: Firebase.ServerValue.TIMESTAMP
            })
            .then(function() {
                $scope.isSubmitting = true;
                return $timeout(function() {
                    $scope.result = 'success';
                }, 500);
            })
            .then(function() {
                return $timeout(function() {
                    $scope.message = '';
                }, 500);
            });
        }; // submit Checkin

        $scope.isUserMessage = function (person) {
            return person.$id === $rootScope.currentUser.$id;
        };

        $scope.user = {};

        $scope.change_message = function () {
            $scope.options.buttonSuccessText = 'Submitting';
            $scope.options.animationCompleteTime = '500';
            var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id);
            var userInfo = $firebase(ref);
            var userObj = userInfo.$asObject();
            $scope.result = 'success';
            console.log($scope.user.newMessage);
            $scope.user.message = $scope.user.newMessage;
        };
    });