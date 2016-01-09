'use strict';

angular.module('App').
		controller('main', function ($scope, $localStorage, $state, autorService) {
			
									
			$scope.isAuthenticated	= function() {
				$scope.user = $localStorage.user;
				$scope.token = $localStorage.token;
				return $scope.token ? true : false;
			};
			
			$scope.logout = function() {
				autorService.LogOut();
			};
			
		});

