'use strict';

	angular.module('App', ['ui.router', 'ngAnimate', 'ngStorage', 'ngSanitize']);
	
		angular.module('App').
		config(function($stateProvider, $urlRouterProvider) {
			
			
		$stateProvider
		.state('about', {
				url:'/about',
				views: {
					'centrV@' : {
						templateUrl:'views/about.html',
					},
				},
			})
		.state('signin', {
				url:'/signin',
				views: {
					'centrV@' : {
						templateUrl:'views/signIn.html',
						controller:'autor'
					},
				},
			})
			.state('signup', {
				url:'/signup',
				views: {
					'centrV@' : {
						templateUrl:'views/signUp.html',
						controller:'autor'
					},
				},
			})
			.state('products', {
				url:'/products',
				views: {
					'centrV@' : {
						templateUrl:'views/products.html',
						controller:'products'
					},
				},
				resolve: {
					products: function(prodService) {
						return prodService.getProd().then(function(res){
							return res;
						});
					}
				}
			})
			.state('product', {
				url:'/product/:id',
				views: {
					'centrV@' : {
						templateUrl:'views/product.html',
						controller:'product'
					},
				},
				resolve: {
					coments: function(comentService, $stateParams) {
						var id = $stateParams.id;
						
						return comentService.getComent(id).then(function(res){
							return res;
						});
					},
					product: function(prodService, $stateParams) {
						var id = $stateParams.id;
						//---------в контроллер возвращаем выбраный продукт из списка
						return prodService.getProd().then(function(res){
							for (var i in res) { 
								if(res[i].id == id) {
									return res[i];
								}
							}
												
						});
					}
				}
			})
			
	})
	.config(function($urlRouterProvider){
		// redirect to /products  
		$urlRouterProvider.when('', '/products');
	})