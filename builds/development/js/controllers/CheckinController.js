myApp.controller('CheckinController',
    function($scope, $firebaseAuth, $location, $rootScope, FIREBASE_URL, Authentication) {

        // Required - set to true on submission
        $scope.isSubmitting = null;

        // Required - set to 'success' or 'error' on success/failure
        $scope.result = null;

        // Optional
        $scope.options = {
            buttonDefaultText: 'Start Checking',
            buttonSuccessText: 'Verified',
            animationCompleteTime: '2000',
            iconPosition: 'left',
            buttonErrorText: 'Not Verified'
        };

        $scope.register = function() {
            Authentication.register($scope.user)
                .then(function() {
                    Authentication.login($scope.user)
                        .then(function() {
                            $scope.isSubmitting = true;
                            $scope.result = 'success';
                        });
                    if($scope.isSubmitting) {
                        $location.path('/post'); 
                    }
                })
                .catch(function(error) {
                    $scope.result = 'error';
                    $scope.message = error.message;
                });
        }; //register

        $scope.logout = function() {
            Authentication.logout();
            $rootScope.currentUser = '';
            $location.path('/login');
        }
    });