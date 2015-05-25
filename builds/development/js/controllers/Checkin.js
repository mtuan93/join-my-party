myApp.controller('CheckinController',
    function($scope, $firebase, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        //Handle checkin button
        $scope.isSubmitting = null;
        $scope.result = null;
        $scope.options = {};
        $scope.options.buttonDefaultText = "Check in this party";
        $scope.options1 = {};
        $scope.options1.buttonDefaultText = "Access this party's gallery";
        $scope.options2 = {};
        $scope.options2.buttonDefaultText = "Check in now!";
        $scope.options2.buttonSubmittingText = "Checking in";
        $scope.options2.buttonSuccessText = "Checked in";
        var ref = new Firebase(FIREBASE_URL + '/users/');
        $scope.allUsers = $firebase(ref).$asArray();

        $scope.go = function(path) {
            $scope.options.buttonSubmittingText = 'Accessing checkins';
            $scope.options.buttonSuccessText = 'Access verified';
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        $location.path(path);
                    }, 1000);
                });
        }; //go

        $scope.go1 = function(path) {
            $scope.options1.buttonSubmittingText = 'Accessing gallary';
            $scope.options1.buttonSuccessText = 'Access verified';
            $scope.isSubmitting1 = true;
            $timeout(function() {
                $scope.result1 = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        $location.path(path);
                    }, 1000);
                });
        }; //go1

        $scope.submitCheckin = function() {
            var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id);
            var userInfo = $firebase(ref);
            var userObj = userInfo.$asObject();
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        userInfo.$update({
                            message: $scope.message,
                            checkinTime: Firebase.ServerValue.TIMESTAMP
                        })
                    }, 1000);
                });
        }; // submit Checkin

        $scope.isUserMessage = function(person) {
            return person.$id === $rootScope.currentUser.$id;
        };

        $scope.user = {};

        $scope.change_message = function() {
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