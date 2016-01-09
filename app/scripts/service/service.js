(function(){
'use strict';
	
	var server = 'http://smktesting.herokuapp.com/';
	
	angular
		.module('App')
			.service('autorService', autorService);
			
	//------------сервис для авторизации------------
	function autorService ($http, $localStorage) {
		/*------------Вход и получение tokena-------
		----------сохранение его в localStorage-----*/
		this.sigIn = function (login, passwd) {
			var resurs = server + 'api/login/';
			var cred = {
				'username': login,
				'password': passwd
			};
			
			//-------------post запрос на авторизацию-------
			return $http({method: 'Post', url: resurs, data: cred}).
					then(function(res) { 
					
						if (res.data.success === true) {
													
							$localStorage.token = res.data.token;
							$localStorage.user = login;
							res.status = 'ok';
																					
						} else {
							res.status = 'Ви не авторизовані';
						}
					
						return res;
					}, function(res) {
						//---------если запрос не успешен возвр ответ 
						return res;
					});
					
		
		};
		/*------------Регистрация и получение tokena-------
		----------сохранение его в localStorage-----------*/
		this.signUp = function (login, passwd) {
			var resurs = server + 'api/register/';
			var cred = {
				'username': login,
				'password': passwd
			};
			
			//-------------post запрос на авторизацию-------
			return $http({method: 'Post', url: resurs, data: cred}).
					then(function(res) { 
					
						if (res.data.success === true) {
													
							$localStorage.token = res.data.token;
							$localStorage.user = login;
							res.status = 'ok';
																					
						} else {
							res.status = 'Ви не зареєстровані';
						}
						return res;
					}, function(res) {
						return res;
					});
		
		};
		//-----------логаут путем очистки токена в localStorage----------
		this.LogOut = function() {
			$localStorage.$reset();
		};
	}
	
	//------------сервис для извлечения товаров------------
	angular
		.module('App')
			.service('prodService', prodService);
			
	function prodService ($http) {
		//------------запрос списка продуктов-----
		this.getProd = function () {
			var resurs = server + 'api/products/';
			var	headers = {
			//		'Authorization': 'Token ' + $localStorage.token // список товаров для неавтор польз
				};
			//-------------post запрос на авторизацию-------
			return $http({method: 'get', url: resurs, headers: headers }).
					then(function(res) { 
						return res.data;
				});
		
		};
		
	}
	
	//------------сервис для извл ост коментов на товары------------
	angular
		.module('App')
			.service('comentService', comentService);
			
	function comentService ($http, $localStorage) {
		//------------запрос списка коментов-----
		this.getComent = function (id) {
			var resurs = server + 'api/reviews/' + id;
			var	headers = {
				//	'Authorization': 'Token ' + $localStorage.token //список коментов для неаториз польз
				};
			//-------------get запрос на коменты-------
			return $http({method: 'get', url: resurs, headers: headers }).
					then(function(res) { 
						return res.data;
				});
		
		};
		
		//------------отправка коментария-----------
		this.putComent = function (id, rate, text) {
			var resurs = server + 'api/reviews/' + id;
			var	headers = {
					'Authorization': 'Token ' + $localStorage.token
				};
			var coment = {
				'rate': rate,
				'text': text
			};
			//-------------post запрос на добавления комента-------
			return $http({method: 'Post', url: resurs, headers: headers, data: coment  }).
					then(function(res) { 
						return res.data;
				});
		
		};
		
	}
	
})(); //------локализируем обявления функций сервисов



  
  	