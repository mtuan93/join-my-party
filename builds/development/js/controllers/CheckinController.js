myApp.controller('CheckinController', function ($scope, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + '/users/');
	var firebaseUsers = $firebase(ref);

	$scope.register = function () {
		var userInfo = {
		name: $scope.user.name,
		email: $scope.user.email,
		description: $scope.user.description
		};
		firebaseUsers.$push(userInfo);
	}
});