myApp.controller('CheckinController',
    function($scope, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        // Required - set to true on submission
        $scope.isSubmitting = null;

        // Required - set to 'success' or 'error' on success/failure
        $scope.result = null;

        // Optional
        $scope.options = {
            buttonSubmittingIcon: 'fa fa-spinner',
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
                            return $timeout(function(){
                            	$scope.result = 'success';
                            }, 2000);
                        }).then(function() {
                        	$location.path('/post'); 
                        });
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