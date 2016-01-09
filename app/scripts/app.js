'use strict';

	angular.module('App', ['ui.router', 'ngAnimate', 'ngStorage']);
	
		angular.module('App').
		config(function($stateProvider) {
		
			
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
						controller:'autor',
						controllerAs:"atr"
					},
				},
			})
			.state('signup', {
				url:'/signup',
				views: {
					'centrV@' : {
						templateUrl:'views/signUp.html',
						controller:'autor',
						controllerAs:"atr"
					},
				},
			})
			.state('products', {
				url:'/products',
				views: {
					'centrV@' : {
						templateUrl:'views/products.html',
						controller:'products',
						controllerAs:"prs"
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
						controller:'product',
						controllerAs:"pr"
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
						//--------- в API нет запроса на продукт по ID тому делаю так
						return prodService.getProd().then(function(res){
							for (var i in res) { 
								if(res[i].id === parseInt(id)) {
									return res[i];
								}
							}
												
						});
					}
				}
			});
			
	})
	.config(function($urlRouterProvider, $httpProvider){
		// redirect to /products  
		$urlRouterProvider.when('', '/products');
		//------ если токен существует добавляем к запросу текен если отве 401 или 403 или 500 делаем редирект--------
		//----------------------------- таким образом обрабатываем каждый запрос к серверу--------------------
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
						
                        config.headers.Authorization = 'Token ' + $localStorage.token;
                    }
					
                    return config;
                },
                'responseError': function(res) {
					//------ сделал 500 для тестирования с запроса на комент без токена редирект, -------------------
					//-------------хотя в отображении убрал возможность отпр комент-----------------------------------
                    if(res.status === 401 || res.status === 403 || res.status === 500) {
                        $location.path('signin');
                    }
                    return $q.reject(res);
                }
            };
        }]);
		
	});
	