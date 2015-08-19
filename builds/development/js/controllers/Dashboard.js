myApp.controller('DashboardController',
    function($scope, $firebase, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        //Handle checkin button
        $scope.isSubmitting = null;
        $scope.result = null;
        $scope.options = {};
        $scope.options.buttonDefaultText = "Add your restaurant";
        $scope.options.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options.buttonSuccessText = 'Added';
        
        var restaurant = new Firebase(FIREBASE_URL + '/restaurant/');
        $scope.allRes = $firebase(restaurant).$asArray();

        $scope.addRestaurant = function() {
            var ref = new Firebase(FIREBASE_URL + '/restaurant');
            var restaurantInfo = $firebase(ref);
            var restaurantObject = restaurantInfo.$asObject();
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        restaurantInfo.$push({
                            name: $scope.restaurant.name,
                            url: $scope.restaurant.url
                        });
                    }, 1000);
                });
        }; // add a restaurant
    });