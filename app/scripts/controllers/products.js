'use strict';

angular.module('App').
		controller('products', function (products) {
			
			var vm = this;
			
			vm.products = products;
			
		});