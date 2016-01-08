'use strict';

angular.module('App').
		controller('products', function ($scope, $rootScope, products) {
			
			$scope.products = products;
			
		});